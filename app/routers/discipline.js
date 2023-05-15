const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsDisciplineFullnameUnique } = require("../helpers/utils");
const disciplineController = require(__dir.controllers + "/discipline");

const router = new Router();

router.post(
  "/addDiscipline",
  checkSchema({
    fullName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (fullName) => {
          await checkIsDisciplineFullnameUnique(fullName);
        },
      },
    },
    shortName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    code: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    cathedra: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    studyField: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { fullName, shortName, code, cathedra, studyField } = req.body;
    disciplineController.addDiscipline(
      fullName,
      shortName,
      code,
      cathedra,
      studyField
    );

    res.status(200).send("Дисциплина добавлена");
  }
);

router.get("/getAllDisciplines", async (req, res) => {
  const result = await disciplineController.getAllDisciplines();

  res.send(result);
});

router.get("/getDiscipline", async (req, res) => {
  const result = await disciplineController.getDiscipline({
    fullName: req.query.fullName,
  });

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

router.post(
  "/addDisciplineCompetence",
  checkSchema({
    disciplineId: {
      isNumeric: { min: 0 },
    },
    competenceId: {
      isNumeric: { min: 0 },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { disciplineId, competenceId } = req.body;
    disciplineController.addDisciplineCompetence(disciplineId, competenceId);

    res.send({ isAdded: true });
  }
);

router.get(
  "/getDisciplineCompetence",
  checkSchema({
    disciplineId: {
      isNumeric: { min: 0 },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await disciplineController.getDisciplineCompetence({
      disciplineId: req.query.disciplineId,
    });

    res.send(result);
  }
);

router.delete("/deleteDisciplineCompetence", async (req, res) => {
  const { laboratoryClassId } = req.query;
  await disciplineController.deleteDisciplineCompetence({
    // laboratoryClassId,
  });

  res.send({ isDeleted: true });
});

router.put("/updateDisciplineCompetence", async (req, res) => {
  const { disciplineId, competenceId } = req.body;

  const result = await disciplineController.updateDisciplineCompetence({
    disciplineId,
    competenceId,
  });

  res.send(result);
});

module.exports = router;
