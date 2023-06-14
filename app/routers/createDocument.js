const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const router = new Router();

const axios = require("axios");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const expressionParser = require("docxtemplater/expressions.js");
const fs = require("fs");
const path = require("path");

expressionParser.filters.loop = function (input, ...keys) {
  const result = input.reduce(function (result, item) {
    (item[keys[0]] || []).forEach(function (subitem) {
      result.push({ ...item, ...subitem });
    });
    return result;
  }, []);
  if (keys.length === 1) {
    return result;
  }
  keys.shift();
  return expressionParser.filters.loop(result, ...keys);
};

expressionParser.filters.where = function (input, query) {
  return input.filter(function (item) {
    return expressions.compile(query)(item);
  });
};

function replaceErrors(key, value) {
  if (value instanceof Error) {
    return Object.getOwnPropertyNames(value).reduce(function (error, key) {
      error[key] = value[key];
      return error;
    }, {});
  }
  return value;
}

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrors));
  if (error.properties && error.properties.errors instanceof Array) {
    const errorMessages = error.properties.errors
      .map(function (error) {
        return error.properties.explanation;
      })
      .join("\n");
    console.log("errorMessages", errorMessages);
  }
  throw error;
}

const createDocument = (data) => {
  for (let i = 0; i < data.length; i++) {
    const resData = data[i];
    const content = fs.readFileSync(path.resolve("template.docx"), "binary"); //
    const zip = new PizZip(content);
    let doc;
    try {
      doc = new Docxtemplater(zip, { parser: expressionParser });
    } catch (error) {
      errorHandler(error);
    }

    doc.setData(resData);
    try {
      doc.render();
    } catch (error) {
      errorHandler(error);
    }
    const buf = doc.getZip().generate({ type: "nodebuffer" });
    fs.writeFileSync(path.resolve("output", `${resData.title}.docx`), buf);
    console.log(`"${resData.title}.docx" written to disk`);
  }
};

router.get(
  "/createDocument",
  checkSchema({
    id: {
      isNumeric: { min: 0 },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { id } = req.query;
    const rpd = await axios.get("http://localhost:8000/rpd/getRpd", {
      params: {
        id,
      },
    });

    const discipline = await axios.get(
      // МАССИВ дисциплин
      "http://localhost:8000/discipline/getDisciplineById",
      {
        params: {
          id: rpd.data.disciplineId,
        },
      }
    );

    const topics = await axios.get("http://localhost:8000/topic/getAllTopics", {
      // МАССИВ ТЕМ
      params: {
        disciplineId: rpd.data.disciplineId,
      },
    });

    const topicHours = await axios.get(
      "http://localhost:8000/rpd/getAllRpdTopicByRpdId",
      {
        // МАССИВ ЧАСОВ К ТЕМАМ
        params: {
          rpdId: rpd.data.id,
        },
      }
    );

    const laboratoryClasses = await axios.get(
      // МАССИВ ЛЗ
      "http://localhost:8000/laboratoryClass/getAllLaboratoryClasses",
      {
        params: {
          disciplineId: discipline.data.id,
        },
      }
    );

    const practicalClasses = await axios.get(
      // МАССИВ ПЗ
      "http://localhost:8000/practicalClass/getAllPracticalClasses",
      {
        params: {
          disciplineId: discipline.data.id,
        },
      }
    );

    const lections = await axios.get(
      // МАССИВ ЛЕКЦИЙ

      "http://localhost:8000/lections/getAllLections",
      {
        params: {
          disciplineId: discipline.data.id,
        },
      }
    );

    const competenceIds = await axios.get(
      "http://localhost:8000/rpd/getAllRpdCompetence",
      {
        params: {
          rpdId: rpd.data.id,
        },
      }
    );

    const competences = await Promise.all(
      // МАССИВ КОМПЕТЕНЦИЙ
      competenceIds.data.map(async (item) => {
        const response = await axios.get(
          "http://localhost:8000/competence/getCompetences",
          {
            params: {
              id: item.competenceId,
            },
          }
        );
        return response.data;
      })
    );

    const examQuestions = await axios.get(
      "http://localhost:8000/examQuestions/getAllExamQuestions",
      {
        params: {
          disciplineId: discipline.data.id,
        },
      }
    );

    const tableTopics = topics.data
      .map((item) => ({ id: item.id, name: item.topicName }))
      .flat(Infinity);

    const firstTableHours = topicHours.data
      .map((item) => ({
        topicId: item.topicId,
        totalHours: item.topicTotalHours,
        lectionHours: item.topicLectionHours,
        practicalHours: item.topicPracticalHours,
        laboratoryHours: item.topicLaboratoryHours,
        selfstudyHours: item.topicSelfstudyHours,
      }))
      .flat(Infinity);

    const docData = [
      {
        title: "РПД",
        year: rpd.data.year,
        code: discipline.data.code,
        disciplineUppercaseName: discipline.data.fullName,
        cathedra: discipline.data.cathedra,
        studyField: discipline.data.studyField,
        disciplineLowercaseName:
          discipline.data.fullName[0].toUpperCase() +
          discipline.data.fullName.slice(1).toLowerCase(),
        competences: competences.map((item) => item).flat(Infinity),
        firstTable: tableTopics
          .flatMap((topic) =>
            firstTableHours.flatMap((item, index) => {
              if (topic.id === item.topicId) {
                return {
                  index: index + 1,
                  name: topic.name,
                  totalHours: item.totalHours,
                  lectionHours: item.lectionHours,
                  practicalHours: item.practicalHours,
                  laboratoryHours: item.laboratoryHours,
                  selfstudyHours: item.selfstudyHours,
                };
              } else return null;
            })
          )
          .filter((item) => item !== null),
        secondTable: tableTopics.map((topic, index) => {
          const labs = laboratoryClasses.data
            .filter((item) => item.topicId === topic.id)
            .reduce(
              (acc, obj, index, arrayRef) =>
                arrayRef.length === index + 1
                  ? acc + obj.laboratoryClassName
                  : acc + obj.laboratoryClassName + ", ",
              ""
            );
          const practice = practicalClasses.data
            .filter((item) => item.topicId === topic.id)
            .reduce(
              (acc, obj, index, arrayRef) =>
                arrayRef.length === index + 1
                  ? acc + obj.practicalClassName
                  : acc + obj.practicalClassName + ", ",
              ""
            );
          const lects = lections.data
            .filter((item) => item.topicId === topic.id)
            .reduce(
              (acc, obj, index, arrayRef) =>
                arrayRef.length === index + 1
                  ? acc + obj.lectionName
                  : acc + obj.lectionName + ", ",
              ""
            );

          return {
            id: index + 1,
            name: topic.name,
            laboratoryClasses: labs,
            practicalClasses: practice,
            lections: lects,
          };
        }),
        thirdTable: tableTopics.map((topic, index) => {
          const filteredQuestions = examQuestions.data.filter(
            (question) => topic.id === question.topicId
          );
          return {
            topicIndex: index + 1,
            name: topic.name,
            question: filteredQuestions.map((item, index) => {
              return {
                questionIndex: index + 1,
                questionName: item.question,
              };
            }),
          };
        }),
        allQuestions: examQuestions.data.map((item, index) => {
          return { id: index + 1, questionName: item.question };
        }),
        topics: topics.data
          .map((item) => ({ id: item.id, name: item.topicName }))
          .flat(Infinity),
        laboratoryClasses: laboratoryClasses.data
          .map((item) => item)
          .flat(Infinity),
        practicalClasses: practicalClasses.data
          .map((item) => item)
          .flat(Infinity),
        lections: lections.data.map((item) => item).flat(Infinity),
        rpdTotalHours: rpd.data.rpdTotalHours,
        rpdLectionHours: rpd.data.rpdLectionHours,
        rpdPracticalHours: rpd.data.rpdPracticalHours,
        rpdLaboratoryHours: rpd.data.rpdLaboratoryHours,
        rpdSelfstudyHours: rpd.data.rpdSelfstudyHours,
        rpdAdditionalHours: rpd.data.rpdAdditionalHours,
      },
    ];

    // console.log(
    //   testTopics
    //     .map((topic, index) => {
    //       const filteredQuestions = testQuestions.filter(
    //         (question) => topic.id === question.topicId
    //       );
    //       return {
    //         topicId: topic.id,
    //         topicIndex: index + 1,
    //         name: topic.name,
    //         question: filteredQuestions.map((item, index) => {
    //           return {
    //             questionIndex: index + 1,
    //             questionTopicId: item.topicId,
    //             questionName: item.question,
    //           };
    //         }),
    //       };
    //     })
    //     .map((item) => item.question)
    // );

    // res.send({ f: true });
    createDocument(docData);
    res.sendFile(`${docData.map((item) => item.title)}.docx`, {
      root: "output",
    });
  }
);

module.exports = router;
