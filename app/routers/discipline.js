const Router = require("express");
const disciplineController = require(__dir.controllers + "/discipline");

const router = new Router();

router.post("/addDiscipline", (err, req, res) => {
  console.log(req.body);
  const { fullName, shortName, code, cathedra, studyField } = req.body;
  disciplineController.addDiscipline(
    fullName,
    shortName,
    code,
    cathedra,
    studyField
  );

  res.status(200).send("Дисциплина добавлена");
});

router.get("/getAllDisciplines", async (req, res) => {
  const result = await disciplineController.getAllDisciplines();

  res.send(result);
});

router.get("/getDiscipline", async (err, req, res) => {
  const result = await disciplineController.getDiscipline({
    fullName: req.query.fullName,
  });

  if (err) {
    console.error(err);
    res.status(401).send("Дисциплина не найдена");
  } else {
    res.send(result);
  }
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
