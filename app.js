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
const examQuestionRouter = require(__dir.routers + "/exam-question");
const laboratoryClassRouter = require(__dir.routers + "/laboratory-class");
const lectionRouter = require(__dir.routers + "/lection");
const practicalClassRouter = require(__dir.routers + "/practical-class");
const rpdRouter = require(__dir.routers + "/rpd");
const topicRouter = require(__dir.routers + "/topic");
const purposeRouter = require(__dir.routers + "/purpose");
const objectiveRouter = require(__dir.routers + "/objective");
const documentRouter = require(__dir.routers + "/create-document");
const authRouter = require(__dir.routers + "/auth");
const ollamaRouter = require(__dir.routers + "/ollama");
const xlsxParser = require(__dir.routers + "/xlsxParser");

const app = Express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: ['https://diplom-front-one.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(BodyParser.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors(corsOptions));
app.use(Express.json());

app.use("/teacher", teacherRouter);
app.use("/competence", competenceRouter);
app.use("/discipline", disciplineRouter);
app.use("/exam-question", examQuestionRouter);
app.use("/laboratory-class", laboratoryClassRouter);
app.use("/lection", lectionRouter);
app.use("/practical-class", practicalClassRouter);
app.use("/rpd", rpdRouter);
app.use("/topic", topicRouter);
app.use("/purpose", purposeRouter);
app.use("/objective", objectiveRouter);
app.use("/document", documentRouter);
app.use("/auth", authRouter);
app.use("/ollama", ollamaRouter);
app.use("/xlsx", xlsxParser);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  } catch (e) {
    console.log("error", e);
  }
};

start();
