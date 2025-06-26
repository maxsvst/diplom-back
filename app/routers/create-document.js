const Router = require("express");
const jwt = require('jsonwebtoken');
const { checkSchema, validationResult } = require("express-validator");

const {
  importCompetences,
  importedDiscipline,
  importExamQuestions,
  importLaboratoryClasses,
  importLections,
  importObjectives,
  importPracticalClasses,
  importPurposes,
  importTopics
} = require("../helpers/import-data");

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
  "/create-document",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);

    const user = {}

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
      return res.status(401).json({ message: "Authorization header is missing" });
    }

    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid authorization header format" });
    }

    try {
      const { fullName, rank } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      user.fullName = fullName
      user.rank = rank
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const { rpdId } = req.query;
    const { data: rpd } = await axios.get(`${process.env.BACK_URL}/rpd/get-rpd`, {
      params: {
        rpdId,
      },
    });

    const { data: discipline } = await axios.get(
      `${process.env.BACK_URL}/discipline/get-discipline`,
      {
        params: {
          disciplineId: rpd.disciplineId,
        },
      }
    );

    const { data: topics } = await axios.get(`${process.env.BACK_URL}/topic/get-all-topics`, {
      // Темы в дисциплине
      params: {
        disciplineId: rpd.disciplineId,
      },
    });

    const { data: rpdTopics } = await axios.get(
      `${process.env.BACK_URL}/rpd/get-all-rpd-topic`,
      {
        // Часы по темам в РПД
        params: {
          rpdId: rpd.rpdId,
        },
      }
    );

    const { data: competencesIds } = await axios.get(
      `${process.env.BACK_URL}/rpd/get-all-rpd-competence`,
      {
        params: {
          rpdId: rpd.rpdId,
        },
      }
    );

    const competencesArray = await Promise.all(
      // МАССИВ КОМПЕТЕНЦИЙ
      competencesIds.map(async ({ competenceId }) => {
        const response = await axios.get(
          `${process.env.BACK_URL}/competence/get-competence`,
          {
            params: {
              competenceId,
            },
          }
        );
        return response.data;
      })
    );

    const competences = competencesArray.flatMap(arr => arr);

    const { data: examQuestions } = await axios.get(
      `${process.env.BACK_URL}/exam-question/get-all-exam-questions`,
      {
        params: {
          disciplineId: rpd.disciplineId,
        },
      }
    );

    const { data: purposes } = await axios.get(
      `${process.env.BACK_URL}/purpose/get-all-purposes`,
      {
        params: {
          disciplineId: rpd.disciplineId,
        },
      }
    );

    const { data: objectives } = await axios.get(
      `${process.env.BACK_URL}/objective/get-all-objectives`,
      {
        params: {
          disciplineId: rpd.disciplineId,
        },
      }
    );

    const topicName = (id) => topics.find(({ topicId }) => topicId === id).topicName

    const day = new Date(rpd.rpdDate).getUTCDate();
    const monthNumber = new Date(rpd.rpdDate).getMonth();
    const months = [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    const month = months[monthNumber];
    const year = new Date(rpd.rpdDate).getUTCFullYear();

    const teacherName = user.fullName.split(' ').map((initial, idx) => {
      if (idx > 0) {
        return initial.substr(0, 1) + '.'
      }
      return initial
    }).join(' ')

    const fomattedPurposes = purposes.map(({ purposeName }) => purposeName).join(', ')
    const fomattedObjectives = objectives.map(({ objectiveName }) => ({ objectiveName }))

    const firstTableHours = rpdTopics
      .map((topic, idx) => ({
        index: idx + 1,
        name: topicName(topic.topicId),
        topicId: topic.topicId,
        totalHours: topic.topicTotalHours,
        lectionHours: topic.topicLectionHours,
        practicalHours: topic.topicPracticalHours,
        laboratoryHours: topic.topicLaboratoryHours,
        selfstudyHours: topic.topicSelfstudyHours,
      }))

    const secondTableHours = await Promise.all(rpdTopics
      .map(async (topic, idx) => {

        const { data: lections } = await axios.get(
          `${process.env.BACK_URL}/lection/get-all-lections`,
          {
            params: {
              topicId: topic.topicId,
            },
          }
        );

        const { data: laboratoryClasses } = await axios.get(
          `${process.env.BACK_URL}/laboratory-class/get-all-laboratory-classes`,
          {
            params: {
              topicId: topic.topicId,
            },
          }
        );

        const { data: practicalClasses } = await axios.get(
          `${process.env.BACK_URL}/practical-class/get-all-practical-classes`,
          {
            params: {
              topicId: topic.topicId,
            },
          }
        );

        const formattedLections = lections.map(({ lectionName }) => lectionName).join('. ')
        const formattedLaboratoryClasses = laboratoryClasses.map(({ laboratoryClassName }) => laboratoryClassName).join('. ')
        const formattedPracticalClasses = practicalClasses.map(({ practicalClassName }) => practicalClassName).join('. ')

        return {
          id: idx + 1,
          name: topicName(topic.topicId),
          lections: formattedLections,
          laboratoryClasses: formattedLaboratoryClasses,
          practicalClasses: formattedPracticalClasses,
        }
      })
    )

    const thirdTableHours = rpdTopics.map((topic, index) => {
      const filteredQuestion = examQuestions.filter(
        (question) => topic.topicId === question.topicId
      );

      return {
        topicIndex: index + 1,
        name: topicName(topic.topicId),
        question: filteredQuestion.map((item, index) => {
          return {
            questionIndex: index + 1,
            questionName: item.examQuestionName,
          };
        }),
      };
    })

    const competenceCodes = competences.map(competenceArray => competenceArray.competenceCode).join(', ')

    const docData =
      [
        {
          title: "РПД",

          day: day,
          month: month,
          year: year, // год рпд и год набора

          code: discipline.code,
          disciplineUppercaseName: discipline.fullName,

          studyField: discipline.studyField,
          profileName: discipline.profileName,
          studyFieldCode: discipline.studyFieldCode,
          disciplineLowercaseName:
            discipline.fullName[0].toUpperCase() +
            discipline.fullName.slice(1).toLowerCase(),

          teacherName: teacherName,
          rank: user.rank,

          purposes: fomattedPurposes,
          objectives: fomattedObjectives,

          competences: competences,

          course: rpd.course,
          semester: rpd.semester,
          controlWeek: `${rpd.controlWeek}-${rpd.controlWeek + 1}`,
          creditUnits: rpd.creditUnits,
          rpdTotalHours: rpd.rpdTotalHours,
          rpdLectionHours: rpd.rpdLectionHours,
          rpdPracticalHours: rpd.rpdPracticalHours,
          rpdLaboratoryHours: rpd.rpdLaboratoryHours,
          rpdSelfstudyHours: rpd.rpdSelfstudyHours,
          rpdAdditionalHours: rpd.rpdAdditionalHours,
          controlWork: rpd.controlWork ? rpd.semester : '-',
          courseProject: rpd.courseProject ? rpd.semester : '-',
          credit: rpd.credit ? rpd.semester : '-',
          exam: rpd.exam ? rpd.semester : '-',

          firstTable: firstTableHours,
          secondTable: secondTableHours,
          thirdTable: thirdTableHours,
          competenceCodes: competenceCodes,
          allQuestions: examQuestions.map(({ examQuestionName }, index) => {
            return { id: index + 1, questionName: examQuestionName };
          })
        }
      ];

    createDocument(docData);
    res.sendFile(`${docData.map((item) => item.title)}.docx`, {
      root: "output",
    });
  }
);

const addingTopics = async (topics) => {
  for (const { disciplineId, topicName } of topics) {
    await axios.post(
      `${process.env.BACK_URL}/topic/add-topic`, {
      disciplineId, topicName
    })
    // await api.addTopic(disciplineId, topicName);
  }
}

const addingCompetences = async (competences) => {
  for (const competence of competences) {
    const {
      disciplineId,
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    } = competence

    await axios.post(
      `${process.env.BACK_URL}/competence/add-competence`, {
      disciplineId,
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    })
    // await api.addCompetence(
    //   disciplineId,
    //   competenceType,
    //   competenceCode,
    //   competenceName,
    //   indicatorCode,
    //   indicatorName,
    // );
  }
}

const addingPurposes = async (purposes) => {
  for (const { disciplineId, purposeName } of purposes) {
    await axios.post(
      `${process.env.BACK_URL}/purpose/add-purpose`, {
      disciplineId, purposeName
    })
    // await api.addPurpose(disciplineId, purposeName);
  }
}

const addingObjectives = async (objectives) => {
  for (const { disciplineId, objectiveName } of objectives) {
    await axios.post(
      `${process.env.BACK_URL}/objective/add-objective`, {
      disciplineId, objectiveName
    })
    // await api.addObjective(disciplineId, objectiveName);
  }
}

router.get(
  "/import-data",
  async (_, res) => {
    try {
      const { code, fullName, profileName, studyField, studyFieldCode } = importedDiscipline

      const { data: disciplineData } = await axios.post(
        `${process.env.BACK_URL}/discipline/add-discipline`, {
        fullName,
        profileName,
        studyField,
        studyFieldCode,
        code,
      });
      const { disciplineId } = disciplineData

      if (disciplineId) {
        const topicsToAdd = importTopics(disciplineId);
        const competencesToAdd = importCompetences(disciplineId);
        const purposesToAdd = importPurposes(disciplineId);
        const objectivesToAdd = importObjectives(disciplineId);

        await addingTopics(topicsToAdd);
        await addingCompetences(competencesToAdd)
        await addingPurposes(purposesToAdd)
        await addingObjectives(objectivesToAdd)

        // const importedTopics = await api.getAllTopics({ disciplineId });
        const { data: topics } = await axios.get(`${process.env.BACK_URL}/topic/get-all-topics`, {
          // Темы в дисциплине
          params: {
            disciplineId,
          },
        });

        const importedTopicsIds = topics.map(({ topicId }) => topicId);

        for (const { topicId, lectionName } of importLections(importedTopicsIds)) {
          try {
            // await api.addLection(topicId, lectionName!);
            await axios.post(
              `${process.env.BACK_URL}/lection/add-lection`, {
              topicId, lectionName
            }
            );
          } catch (error) {
            console.error(`Ошибка при добавлении лекции "${lectionName}" к теме ${topicId}:`, error);
          }
        }

        for (const { topicId, laboratoryClassName } of importLaboratoryClasses(importedTopicsIds)) {
          try {
            await axios.post(
              `${process.env.BACK_URL}/laboratory-class/add-laboratory-class`, {
              topicId, laboratoryClassName
            }
            );
            // await api.addLaboratoryClass(topicId, laboratoryClassName!);
          } catch (error) {
            console.error(`Ошибка при добавлении лабораторного занятия "${laboratoryClassName}" к теме ${topicId}:`, error);
          }
        }

        for (const { topicId, practicalClassName } of importPracticalClasses(importedTopicsIds)) {
          try {
            await axios.post(
              `${process.env.BACK_URL}/practical-class/add-practical-class`, {
              topicId, practicalClassName
            }
            );
            // await api.addPracticalClass(topicId, practicalClassName!);
          } catch (error) {
            console.error(`Ошибка при добавлении практического занятия "${practicalClassName}" к теме ${topicId}:`, error);
          }
        }

        for (const { topicId, examQuestionName } of importExamQuestions(disciplineId, importedTopicsIds)) {
          try {
            await axios.post(
              `${process.env.BACK_URL}/exam-question/add-exam-question`, {
              disciplineId, topicId, examQuestionName
            }
            );
            // await api.addExamQuestion(disciplineId, topicId, examQuestionName!);
          } catch (error) {
            console.error(`Ошибка при добавлении вопроса к экзамену "${examQuestionName}" к теме ${topicId}:`, error);
          }
        }
      } else {
        console.warn("disciplineId отсутствует. Невозможно импортировать темы.");
      }
      res.status(200).json({ isImported: true });
    } catch (error) {
      console.error("Error in /import-data route:", error);
      res.status(500).json({ error: "Failed to import data" });
    }
  }
)

module.exports = router;
