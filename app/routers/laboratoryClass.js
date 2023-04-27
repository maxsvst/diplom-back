const Router = require("express");
const laboratoryClassController = require(__dir.controllers +
  "/laboratoryClass");

const router = new Router();

router.post("/addLaboratoryClass", (req, res) => {
  const { disciplineId, laboratoryClassName } = req.body;
  laboratoryClassController.addLaboratoryClass(
    disciplineId,
    laboratoryClassName
  );

  res.send({ isAdded: true });
});

router.get("/getLaboratoryClass", async (req, res) => {
  const result = await laboratoryClassController.getLaboratoryClass({
    disciplineId: req.query.disciplineId,
  });

  res.send(result);
});

router.delete("/deleteLaboratoryClass", async (req, res) => {
  const { laboratoryClassId } = req.query;
  await laboratoryClassController.deleteLaboratoryClass({
    laboratoryClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateLaboratoryClass", async (req, res) => {
  const { laboratoryClassId, disciplineId, laboratoryClassName } = req.body;

  const result = await laboratoryClassController.updateLaboratoryClass({
    laboratoryClassId,
    disciplineId,
    laboratoryClassName,
  });

  res.send(result);
});

module.exports = router;
