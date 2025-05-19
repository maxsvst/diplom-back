const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsCompetenceCodeUnique } = require("../helpers/utils");
const competenceController = require(__dir.controllers + "/competence");

const router = new Router();

router.post(
  "/add-competence",
  checkSchema({
    disciplineId: {
      isUUID: true,
      errorMessage: 'disciplineId must be a valid UUID v4',
    },
    competenceType: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (competenceType, { req }) => {
          (competenceCode = req.body.competenceCode),
            (competenceName = req.body.competenceName),
            (indicatorCode = req.body.indicatorCode),
            (indicatorName = req.body.indicatorName);
          await checkIsCompetenceCodeUnique(
            competenceType,
            competenceCode,
            competenceName,
            indicatorCode,
            indicatorName
          );
        },
      },
    },
    competenceCode: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    competenceName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    indicatorCode: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
    indicatorName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const {
      disciplineId,
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    } = req.body;

    try {
      const competenceId = await competenceController.addCompetence(
        disciplineId,
        competenceType,
        competenceCode,
        competenceName,
        indicatorCode,
        indicatorName
      );
      res.status(201).json({ competenceId, isAdded: true });
    } catch (error) {
      console.error("Error in /addCompetence route:", error);
      res.status(500).json({ error: "Failed to add competence" });
    }
  }
);

router.get("/getUniqueCompetence", async (req, res) => {
  const result = await competenceController.getUniqueCompetence({
    competenceType: req.query.competenceType,
    competenceCode: req.query.competenceCode,
    competenceName: req.query.competenceName,
    indicatorCode: req.query.indicatorCode,
    indicatorName: req.query.indicatorName,
  });

  res.send(result);
});

router.get("/get-all-competences", async (req, res) => {
  const { disciplineId } = req.query;
  const result = await competenceController.getAllCompetences({
    disciplineId
  });

  res.send(result);
});

router.get("/get-competence", async (req, res) => {
  const { id } = req.query;
  const result = await competenceController.getCompetences({
    id,
  });

  res.send(result);
});

router.delete("/delete-competence", async (req, res) => {
  const { competenceId } = req.query;
  await competenceController.deleteCompetence({
    competenceId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-competence", async (req, res) => {
  const {
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName,
  } = req.body;

  const result = await competenceController.updateCompetence({
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName,
  });

  res.send(result);
});

module.exports = router;
