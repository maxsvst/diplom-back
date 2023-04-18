const Router = require("express");
const competenceController = require(__dir.controllers + "/competence");

const router = new Router();

router.post("/addCompetence", (req, res) => {
  const {
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName,
  } = req.body;

  competenceController.addCompetence(
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName
  );

  res.send({ isAdded: true });
});

router.get("/getCompetence", async (req, res) => {
  const result = await competenceController.getCompetence({ id: req.query.id });

  res.send(result);
});

router.delete("/deleteCompetence", async (req, res) => {
  const { id } = req.query;
  await competenceController.deleteCompetence({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateCompetence", async (req, res) => {
  const {
    id,
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName,
  } = req.body;

  const result = await competenceController.updateCompetence({
    id,
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName,
  });

  res.send(result);
});

module.exports = router;
