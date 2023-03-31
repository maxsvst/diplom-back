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
const apiRouter = require(__dir.routers + "/api");

const app = Express();
const PORT = process.env.PORT || 8080;

app.use(BodyParser.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors());
app.use(Express.json());

app.use("/api", apiRouter);

const start = async () => {
  try {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    await dataBase.migrate.latest();
  } catch (e) {
    console.log("error", e);
  }
};

start();
