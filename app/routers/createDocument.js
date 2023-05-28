const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const router = new Router();

const axios = require("axios");

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

function errorHandler(error) {
  console.log(JSON.stringify({ error: error }, replaceErrxors));
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
    const content = fs.readFileSync(path.resolve("template.docx"), "binary");
    const zip = new PizZip(content);
    let doc;
    try {
      doc = new Docxtemplater(zip);
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

    const competenceArray = await Promise.all(
      // [[{}],[{}]] - flat(Infinity) - МАССИВ КОМПЕТЕНЦИЙ
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
        // competenceType1: "Общепрофессиональные компетенции",
        // competenceType2: "профессиональный",
        // competenceCode1: "ОПК-2",
        // competenceCode2: "ПК-8.",
        // competenceName1:
        //   "Способен понимать принципы работы современных информационных технологий и программных средств, в том числе отечественного производства, и использовать их при решении задач профессиональной деятельности",
        // competenceName2:
        //   "Способен осуществлять ведение баз данных в информационных системах, обеспечивать их безопасность и целостность",
        // indicatorCode1: "ОПК-2.1. Знать: ",
        // indicatorCode2: "ПК-8.1. Знать:",
        // indicatorName1:
        //   "современные информационно- коммуникационные и интеллектуальные технологии, инструментальные среды, программно-технические платформы для решения профессиональных задач.",
        // indicatorName2:
        //   "методы реляционной алгебры и языки программирования, ориентированными на обработку данных для построения, сопровождения и модификации баз данных ",
        rpdTotalHours: rpd.data.rpdTotalHours,
        rpdLectionHours: rpd.data.rpdLectionHours,
        rpdPracticalHours: rpd.data.rpdPracticalHours,
        rpdLaboratoryHours: rpd.data.rpdLaboratoryHours,
        rpdSelfstudyHours: rpd.data.rpdSelfstudyHours,
        rpdAdditionalHours: rpd.data.rpdAdditionalHours,
      },
    ];
    createDocument(docData);
    res.sendFile(`${docData.map((item) => item.title)}.docx`, {
      root: "output",
    });
  }
);

module.exports = router;
