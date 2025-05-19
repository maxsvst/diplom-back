const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const {
  checkIsDisciplineFullnameUnique,
  checkIsDisciplineCompetenceUnique,
} = require("../helpers/utils");
const disciplineController = require(__dir.controllers + "/discipline");

const router = new Router();

// Validation schemas
const disciplineSchema = {
  fullName: {
    isString: true,
    isLength: {
      options: { min: 1 },
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
      options: { min: 1 },
    },
  },
  code: {
    isString: true,
    isLength: {
      options: { min: 1 },
    },
  },
  cathedra: {
    isString: true,
    isLength: {
      options: { min: 1 },
    },
  },
  studyField: {
    isString: true,
    isLength: {
      options: { min: 1 },
    },
  },
};

// Error handling middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.post(
  "/add-discipline",
  checkSchema(disciplineSchema),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { fullName, shortName, code, cathedra, studyField } = req.body;
      const discipline = await disciplineController.addDiscipline(
        fullName,
        shortName,
        code,
        cathedra,
        studyField
      );
      res.status(201).json(discipline);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/get-all-disciplines", async (req, res) => {
  try {
    const disciplines = await disciplineController.getAllDisciplines();
    res.json(disciplines);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// router.get(
//   "/get-discipline",
//   checkSchema({
//     fullName: {
//       isString: true,
//       isLength: { options: { min: 1 } },
//     },
//   }),
//   handleValidationErrors,
//   async (req, res) => {
//     try {
//       const discipline = await disciplineController.getDiscipline({
//         fullName: req.query.fullName,
//       });
//       if (!discipline) {
//         return res.status(404).json({ error: "Дисциплина не найдена" });
//       }
//       res.json(discipline);
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   }
// );

router.get(
  "/get-discipline",
  handleValidationErrors,
  async (req, res) => {
    try {
      const discipline = await disciplineController.getDiscipline(req.query.disciplineId);
      if (!discipline) {
        return res.status(404).json({ error: "Дисциплина не найдена" });
      }
      res.json(discipline);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete-discipline",
  // checkSchema(idSchema),
  handleValidationErrors,
  async (req, res) => {
    try {
      await disciplineController.deleteDiscipline(req.query.id);
      res.json({ message: "Дисциплина успешно удалена" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/update-discipline",
  checkSchema({

    ...disciplineSchema,
  }),
  handleValidationErrors,
  async (req, res) => {
    try {
      const discipline = await disciplineController.updateDiscipline(req.body);
      res.json(discipline);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Discipline Teacher routes
router.post(
  "/add-discipline-teacher",
  // checkSchema({
  //   disciplineId: { isNumeric: { min: 0 } },
  //   teacherId: { isNumeric: { min: 0 } },
  // }),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { disciplineId, teacherId } = req.body;
      const result = await disciplineController.addDisciplineTeacher(disciplineId, teacherId);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/get-discipline-teacher",
  // checkSchema({
  //   disciplineId: { isNumeric: { min: 0 } },
  // }),
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await disciplineController.getDisciplineTeacher({
        disciplineId: req.query.disciplineId,
      });
      if (!result) {
        return res.status(404).json({ error: "Связь дисциплины с преподавателем не найдена" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete-discipline-teacher",
  // checkSchema({
  //   disciplineId: { isNumeric: { min: 0 } },
  // }),
  handleValidationErrors,
  async (req, res) => {
    try {
      await disciplineController.deleteDisciplineTeacher(req.query.disciplineId);
      res.json({ message: "Связь дисциплины с преподавателем успешно удалена" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/update-discipline-teacher",
  // checkSchema({
  //   disciplineId: { isNumeric: { min: 0 } },
  //   teacherId: { isNumeric: { min: 0 } },
  // }),
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await disciplineController.updateDisciplineTeacher(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Discipline Competence routes
router.post(
  "/add-discipline-competence",
  // checkSchema({
  //   disciplineId: {
  //     isNumeric: { min: 0 },
  //     custom: {
  //       options: async (disciplineId, request) => {
  //         const competenceId = request.req.body.competenceId;
  //         await checkIsDisciplineCompetenceUnique(disciplineId, competenceId);
  //       },
  //     },
  //   },
  //   competenceId: { isNumeric: { min: 0 } },
  // }),
  handleValidationErrors,
  async (req, res) => {
    try {
      const { disciplineId, competenceId } = req.body;
      const result = await disciplineController.addDisciplineCompetence(disciplineId, competenceId);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get(
  "/get-discipline-competence",
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await disciplineController.getDisciplineCompetence({
        disciplineId: req.query.disciplineId,
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete-discipline-competence",

  handleValidationErrors,
  async (req, res) => {
    try {
      await disciplineController.deleteDisciplineCompetence(req.query.disciplineId);
      res.json({ message: "Связь дисциплины с компетенцией успешно удалена" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.put(
  "/update-discipline-competence",
  handleValidationErrors,
  async (req, res) => {
    try {
      const result = await disciplineController.updateDisciplineCompetence(req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
