global.__dir = {
  controllers: __dirname + "/app/controllers",
  routers: __dirname + "/app/routers",
  libs: __dirname + "/app/libs",
};

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
const documentRouter = require(__dir.routers + "/createDocument");

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
app.use("/document", documentRouter);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log("error", e);
  }
};

start();
