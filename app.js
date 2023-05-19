global.__dir = {
  controllers: __dirname + "/app/controllers",
  routers: __dirname + "/app/routers",
  libs: __dirname + "/app/libs",
};

const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

require("dotenv").config();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");

const { dataBase } = require(__dir.libs + "/dataBase");

const teacherRouter = require(__dir.routers + "/teacher");
const competenceRouter = require(__dir.routers + "/competence");
const disciplineRouter = require(__dir.routers + "/discipline");
const examQuestionsRouter = require(__dir.routers + "/examQuestions");
const laboratoryClassRouter = require(__dir.routers + "/laboratoryClass");
const lectionsRouter = require(__dir.routers + "/lections");
const practicalClassRouter = require(__dir.routers + "/practicalClass");
const rpdRouter = require(__dir.routers + "/rpd");
const topicRouter = require(__dir.routers + "/topic");

const app = Express();
const PORT = process.env.PORT || 8080;

app.use(BodyParser.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors());
app.use(Express.json());

app.use("/teacher", teacherRouter);
app.use("/competence", competenceRouter);
app.use("/discipline", disciplineRouter);
app.use("/examQuestions", examQuestionsRouter);
app.use("/laboratoryClass", laboratoryClassRouter);
app.use("/lections", lectionsRouter);
app.use("/practicalClass", practicalClassRouter);
app.use("/rpd", rpdRouter);
app.use("/topic", topicRouter);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    await dataBase.migrate.latest();
  } catch (e) {
    console.log("error", e);
  }
};

const allData = [
  {
    title: "РПД",
    theme1: "Основные понятия систем баз данных. РМД. Основные понятия РМД.",
    theme2: "Языки запросов современных СУБД.",
    theme3:
      "Концептуальное проектирование, реализация, оценка работы и поддержка базы данных.",
    theme4: "Безопасность баз данных.",
  },
];

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

// for (let i = 0; i < allData.length; i++) {
//   const data = allData[i];
//   const content = fs.readFileSync(
//     path.resolve(__dirname, "template.docx"),
//     "binary"
//   );
//   const zip = new PizZip(content);
//   let doc;
//   try {
//     doc = new Docxtemplater(zip);
//   } catch (error) {
//     errorHandler(error);
//   }

//   doc.setData(data);
//   try {
//     doc.render();
//   } catch (error) {
//     errorHandler(error);
//   }
//   const buf = doc.getZip().generate({ type: "nodebuffer" });

//   fs.writeFileSync(
//     path.resolve(__dirname, "output", `${data.title}.docx`),
//     buf
//   );
//   console.log(`"${data.title}.docx" written to disk`);
// }

start();
