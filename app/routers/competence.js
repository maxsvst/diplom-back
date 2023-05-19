const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsCompetenceCodeUnique } = require("../helpers/utils");
const competenceController = require(__dir.controllers + "/competence");

const router = new Router();

router.post(
  "/addCompetence",
  checkSchema({
    competenceType: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (competenceType, request) => {
          (competenceCode = request.req.body.competenceCode),
            (competenceName = request.req.body.competenceName),
            (indicatorCode = request.req.body.indicatorCode),
            (indicatorName = request.req.body.indicatorName);
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
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
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

router.get("/getAllCompetences", async (req, res) => {
  const result = await competenceController.getAllCompetences();

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
