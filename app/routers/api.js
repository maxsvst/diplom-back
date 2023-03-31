const Router = require("express");
const apiController = require(__dir.controllers + "/api");

const router = new Router();

router.post("/registration", async (req, res) => {
  const { fullName, email, password, rank, position } = req.body;
  const token = await apiController.registration(
    fullName,
    email,
    password,
    rank,
    position
  );
  res.send({ token });
});

module.exports = router;
