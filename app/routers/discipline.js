const Router = require("express");
const disciplineController = require(__dir.controllers + "/discipline");

const router = new Router();

router.post("/addDiscipline", (req, res) => {
  const { fullName, shortName, code, cathedra, studyField } = req.body;
  disciplineController.addDiscipline(
    fullName,
    shortName,
    code,
    cathedra,
    studyField
  );

  res.send({ isAdded: true });
});

router.get("/getDiscipline", async (req, res) => {
  const result = await disciplineController.getDiscipline({ id: req.query.id });

  res.send(result);
});

router.delete("/deleteDiscipline", async (req, res) => {
  const { id } = req.query;
  await disciplineController.deleteDiscipline({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateDiscipline", async (req, res) => {
  const { id, fullName, shortName, code, cathedra, studyField } = req.body;

  const result = await disciplineController.updateDiscipline({
    id,
    fullName,
    shortName,
    code,
    cathedra,
    studyField,
  });

  res.send(result);
});

router.post("/addDisciplineTeacher", (req, res) => {
  const { disciplineId, teacherId } = req.body;
  disciplineController.addDisciplineTeacher(disciplineId, teacherId);

  res.send({ isAdded: true });
});

router.get("/getDisciplineTeacher", async (req, res) => {
  const result = await disciplineController.getDisciplineTeacher({
    disciplineId: req.query.disciplineId,
  });

  res.send(result);
});

router.delete("/deleteDisciplineTeacher", async (req, res) => {
  const { disciplineId } = req.query;
  await disciplineController.deleteDisciplineTeacher({
    disciplineId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateDisciplineTeacher", async (req, res) => {
  const { disciplineId, teacherId } = req.body;

  const result = await disciplineController.updateDisciplineTeacher({
    disciplineId,
    teacherId,
  });

  res.send(result);
});

module.exports = router;
