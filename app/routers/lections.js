const Router = require("express");
const lectionsController = require(__dir.controllers + "/lections");

const router = new Router();

router.post("/addLections", (req, res) => {
  const { disciplineId, topicId, lectionName } = req.body;
  lectionsController.addLections(disciplineId, topicId, lectionName);

  res.send({ isAdded: true });
});

router.get("/getLections", async (req, res) => {
  const result = await lectionsController.getLections({
    lectionName: req.query.lectionName,
  });

  res.send(result);
});

router.delete("/deleteLections", async (req, res) => {
  const { id } = req.query;
  await lectionsController.deleteLections({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateLections", async (req, res) => {
  const { id, disciplineId, name } = req.body;

  const result = await lectionsController.updateLections({
    id,
    disciplineId,
    name,
  });

  res.send(result);
});

module.exports = router;
