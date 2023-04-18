const Router = require("express");
const rpdController = require(__dir.controllers + "/rpd");

const router = new Router();

router.post("/addRpd", (req, res) => {
  const { year } = req.body;
  rpdController.addRpd(year);

  res.send({ isAdded: true });
});

router.get("/getRpd", async (req, res) => {
  const result = await rpdController.getRpd({
    id: req.query.id,
  });

  res.send(result);
});

router.delete("/deleteRpd", async (req, res) => {
  const { id } = req.query;
  await rpdController.deleteRpd({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateRpd", async (req, res) => {
  const { id, year } = req.body;

  const result = await rpdController.updateRpd({
    id,
    year,
  });

  res.send(result);
});



router.post("/addRpdCompetence", (req, res) => {
  const { rpdId, competenceId } = req.body;
  rpdController.addRpdCompetence(rpdId, competenceId);

  res.send({ isAdded: true });
});

router.get("/getRpdCompetence", async (req, res) => {
  const result = await rpdController.getRpdCompetence({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/deleteRpdCompetence", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdCompetence({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateRpdCompetence", async (req, res) => {
  const { rpdId, competenceId } = req.body;

  const result = await rpdController.updateRpdCompetence({
    rpdId,
    competenceId,
  });

  res.send(result);
});



router.post("/addRpdLaboratoryClass", (req, res) => {
  const { rpdId, laboratoryClassId } = req.body;
  rpdController.addRpdLaboratoryClass(rpdId, laboratoryClassId);

  res.send({ isAdded: true });
});

router.get("/getRpdLaboratoryClass", async (req, res) => {
  const result = await rpdController.getRpdLaboratoryClass({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/deleteRpdLaboratoryClass", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdLaboratoryClass({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateRpdLaboratoryClass", async (req, res) => {
  const { rpdId, laboratoryClassId } = req.body;

  const result = await rpdController.updateRpdLaboratoryClass({
    rpdId,
    laboratoryClassId,
  });

  res.send(result);
});



router.post("/addRpdPracticalClass", (req, res) => {
  const { rpdId, practicalClassId } = req.body;
  rpdController.addRpdPracticalClass(rpdId, practicalClassId);

  res.send({ isAdded: true });
});

router.get("/getRpdPracticalClass", async (req, res) => {
  const result = await rpdController.getRpdPracticalClass({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/deleteRpdPracticalClass", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdPracticalClass({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateRpdPracticalClass", async (req, res) => {
  const { rpdId, practicalClassId } = req.body;

  const result = await rpdController.updateRpdPracticalClass({
    rpdId,
    practicalClassId,
  });

  res.send(result);
});



router.post("/addRpdLections", (req, res) => {
  const { rpdId, lectionsId } = req.body;
  rpdController.addRpdLections(rpdId, lectionsId);

  res.send({ isAdded: true });
});

router.get("/getRpdLections", async (req, res) => {
  const result = await rpdController.getRpdLections({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/deleteRpdLections", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdLections({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateRpdLections", async (req, res) => {
  const { rpdId, lectionsId } = req.body;

  const result = await rpdController.updateRpdLections({
    rpdId,
    lectionsId,
  });

  res.send(result);
});



router.post("/addRpdTopic", (req, res) => {
  const { rpdId, topicId, semester, totalHours, selfstudyHours } = req.body;
  rpdController.addRpdTopic(
    rpdId,
    topicId,
    semester,
    totalHours,
    selfstudyHours
  );

  res.send({ isAdded: true });
});

router.get("/getRpdTopic", async (req, res) => {
  const result = await rpdController.getRpdTopic({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/deleteRpdTopic", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdTopic({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateRpdTopic", async (req, res) => {
  const { rpdId, topicId, semester, totalHours, selfstudyHours } = req.body;

  const result = await rpdController.updateRpdTopic({
    rpdId,
    topicId,
    semester,
    totalHours,
    selfstudyHours,
  });

  res.send(result);
});

module.exports = router;
