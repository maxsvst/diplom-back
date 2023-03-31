require("dotenv").config();
const Express = require("express");
const Cors = require("cors");
const BodyParser = require("body-parser");

const app = Express();
const PORT = process.env.PORT || 8080;

app.use(BodyParser.json({ extended: true }));
app.use(BodyParser.urlencoded({ extended: true }));
app.use(Cors());
app.use(Express.json());

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (e) {
    console.log("error", e);
  }
};

start();
