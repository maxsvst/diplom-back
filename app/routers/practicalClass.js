const Router = require("express");
const practicalClassController = require(__dir.controllers + "/practicalClass");

const router = new Router();

router.post("/addPracticalClass", (req, res) => {
  const { disciplineId, practicalClassName } = req.body;
  practicalClassController.addPracticalClass(disciplineId, practicalClassName);

  res.send({ isAdded: true });
});

router.get("/getPracticalClass", async (req, res) => {
  const result = await practicalClassController.getPracticalClass({
    practicalClassId: req.query.practicalClassId,
  });

  res.send(result);
});

router.delete("/deletePracticalClass", async (req, res) => {
  const { practicalClassId } = req.query;
  await practicalClassController.deletePracticalClass({
    practicalClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/updatePracticalClass", async (req, res) => {
  const { practicalClassId, disciplineId, practicalClassName } = req.body;

  const result = await practicalClassController.updatePracticalClass({
    practicalClassId,
    disciplineId,
    practicalClassName,
  });

  res.send(result);
});

module.exports = router;
