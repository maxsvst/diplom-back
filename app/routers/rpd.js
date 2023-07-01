const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const {
  checkIsRpdUnique,
  checkIsRpdCompetenceUnique,
  checkIsRpdLaboratoryClassUnique,
  checkIsRpdPracticalClassUnique,
  checkIsRpdLectionsUnique,
  checkIsRpdTopicUnique,
} = require("../helpers/utils");
const rpdController = require(__dir.controllers + "/rpd");

const router = new Router();

router.post(
  "/addRpd",
  checkSchema({
    disciplineId: {
      isNumeric: { min: 0 },
      custom: {
        options: async (disciplineId, request) => {
          (rpdTotalHours = request.req.body.rpdTotalHours),
            (rpdLectionHours = request.req.body.rpdLectionHours),
            (rpdPracticalHours = request.req.body.rpdPracticalHours),
            (rpdLaboratoryHours = request.req.body.rpdLaboratoryHours),
            (rpdSelfstudyHours = request.req.body.rpdSelfstudyHours),
            (rpdAdditionalHours = request.req.body.rpdAdditionalHours),
            (year = request.req.body.year),
            await checkIsRpdUnique(
              disciplineId,
              rpdTotalHours,
              rpdLectionHours,
              rpdPracticalHours,
              rpdLaboratoryHours,
              rpdSelfstudyHours,
              rpdAdditionalHours,
              year
            );
        },
      },
    },
    rpdTotalHours: {
      isNumeric: { min: 0 },
    },
    rpdLectionHours: {
      isNumeric: { min: 0 },
    },
    rpdPracticalHours: {
      isNumeric: { min: 0 },
    },
    rpdLaboratoryHours: {
      isNumeric: { min: 0 },
    },
    rpdSelfstudyHours: {
      isNumeric: { min: 0 },
    },
    rpdSelfstudyHours: {
      isNumeric: { min: 0 },
    },
    rpdAdditionalHours: {
      isNumeric: { min: 0 },
    },
    year: {
      isNumeric: { min: 0 },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      disciplineId,
      rpdTotalHours,
      rpdLectionHours,
      rpdPracticalHours,
      rpdLaboratoryHours,
      rpdSelfstudyHours,
      rpdAdditionalHours,
      year,
    } = req.body;
    rpdController.addRpd(
      disciplineId,
      rpdTotalHours,
      rpdLectionHours,
      rpdPracticalHours,
      rpdLaboratoryHours,
      rpdSelfstudyHours,
      rpdAdditionalHours,
      year
    );

    res.send({ isAdded: true });
  }
);

router.get(
  "/getRpd",
  checkSchema({
    id: {
      isNumeric: { min: 0 },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await rpdController.getRpd({
      id: req.query.id,
    });

    res.send(result);
  }
);

router.get(
  "/getUniqueRpd",
  checkSchema({
    disciplineId: {
      isNumeric: { min: 0 },
    },
    rpdTotalHours: {
      isNumeric: { min: 0 },
    },
    rpdLectionHours: {
      isNumeric: { min: 0 },
    },
    rpdPracticalHours: {
      isNumeric: { min: 0 },
    },
    rpdLaboratoryHours: {
      isNumeric: { min: 0 },
    },
    rpdSelfstudyHours: {
      isNumeric: { min: 0 },
    },
    rpdSelfstudyHours: {
      isNumeric: { min: 0 },
    },
    rpdAdditionalHours: {
      isNumeric: { min: 0 },
    },
    year: {
      isNumeric: { min: 0 },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await rpdController.getRpd({
      disciplineId: req.query.disciplineId,
      rpdTotalHours: req.query.rpdTotalHours,
      rpdLectionHours: req.query.rpdLectionHours,
      rpdPracticalHours: req.query.rpdPracticalHours,
      rpdLaboratoryHours: req.query.rpdLaboratoryHours,
      rpdSelfstudyHours: req.query.rpdSelfstudyHours,
      rpdAdditionalHours: req.query.rpdAdditionalHours,
      year,
    });

    res.send(result);
  }
);

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

router.post(
  "/addRpdCompetence",
  checkSchema({
    rpdId: {
      isNumeric: { min: 0 },
      custom: {
        options: async (rpdId, request) => {
          (competenceId = request.req.body.competenceId),
            await checkIsRpdCompetenceUnique(rpdId, competenceId);
        },
      },
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
    const { rpdId, competenceId } = req.body;
    rpdController.addRpdCompetence(rpdId, competenceId);

    res.send({ isAdded: true });
  }
);

router.get("/getAllRpdCompetence", async (req, res) => {
  const result = await rpdController.getAllRpdCompetence({
    rpdId: req.query.rpdId,
  });

  res.send(result);
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

router.post(
  "/addRpdLaboratoryClass",
  checkSchema({
    rpdId: {
      isNumeric: { min: 0 },
      custom: {
        options: async (rpdId, request) => {
          (laboratoryClassId = request.req.body.laboratoryClassId),
            (laboratoryHours = request.req.body.laboratoryHours),
            await checkIsRpdLaboratoryClassUnique(
              rpdId,
              laboratoryClassId,
              laboratoryHours
            );
        },
      },
    },
    laboratoryClassId: {
      isNumeric: { min: 0 },
    },
    laboratoryHours: {
      isNumeric: { min: 0 },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { rpdId, laboratoryClassId, laboratoryHours } = req.body;
    rpdController.addRpdLaboratoryClass(
      rpdId,
      laboratoryClassId,
      laboratoryHours
    );

    res.send({ isAdded: true });
  }
);

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

router.post(
  "/addRpdPracticalClass",
  checkSchema({
    rpdId: {
      isNumeric: { min: 0 },
      custom: {
        options: async (rpdId, request) => {
          (practicalClassId = request.req.body.practicalClassId),
            (practicalHours = request.req.body.practicalHours),
            await checkIsRpdPracticalClassUnique(
              rpdId,
              practicalClassId,
              practicalHours
            );
        },
      },
    },
    practicalClassId: {
      isNumeric: { min: 0 },
    },
    practicalHours: {
      isNumeric: { min: 0 },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { rpdId, practicalClassId, practicalHours } = req.body;
    rpdController.addRpdPracticalClass(rpdId, practicalClassId, practicalHours);

    res.send({ isAdded: true });
  }
);

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

router.post(
  "/addRpdLections",
  checkSchema({
    rpdId: {
      isNumeric: { min: 0 },
      custom: {
        options: async (rpdId, request) => {
          (lectionId = request.req.body.lectionId),
            (lectionHours = request.req.body.lectionHours),
            await checkIsRpdLectionsUnique(rpdId, lectionId, lectionHours);
        },
      },
    },
    lectionId: {
      isNumeric: { min: 0 },
    },
    lectionHours: {
      isNumeric: { min: 0 },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { rpdId, lectionId, lectionHours } = req.body;
    rpdController.addRpdLections(rpdId, lectionId, lectionHours);

    res.send({ isAdded: true });
  }
);

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
  const { rpdId, lectionId } = req.body;

  const result = await rpdController.updateRpdLections({
    rpdId,
    lectionId,
  });

  res.send(result);
});

router.post(
  "/addRpdTopic",
  checkSchema({
    rpdId: {
      isNumeric: { min: 0 },
      custom: {
        options: async (rpdId, request) => {
          (topicId = request.req.body.topicId),
            (topicTotalHours = request.req.body.topicTotalHours),
            (topicTotalHours = request.req.body.topicTotalHours),
            (topicLectionHours = request.req.body.topicLectionHours),
            (topicPracticalHours = request.req.body.topicPracticalHours),
            (topicLaboratoryHours = request.req.body.topicLaboratoryHours),
            (topicSelfstudyHours = request.req.body.topicSelfstudyHours),
            await checkIsRpdTopicUnique(
              rpdId,
              topicId,
              topicTotalHours,
              topicLectionHours,
              topicPracticalHours,
              topicLaboratoryHours,
              topicSelfstudyHours
            );
        },
      },
    },
    topicId: {
      isNumeric: { min: 0 },
    },
    topicTotalHours: {
      isNumeric: { min: 0 },
    },
    topicLectionHours: {
      isNumeric: { min: 0 },
    },
    topicPracticalHours: {
      isNumeric: { min: 0 },
    },
    topicLaboratoryHours: {
      isNumeric: { min: 0 },
    },
    topicSelfstudyHours: {
      isNumeric: { min: 0 },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const {
      rpdId,
      topicId,
      topicTotalHours,
      topicLectionHours,
      topicPracticalHours,
      topicLaboratoryHours,
      topicSelfstudyHours,
    } = req.body;
    rpdController.addRpdTopic(
      rpdId,
      topicId,
      topicTotalHours,
      topicLectionHours,
      topicPracticalHours,
      topicLaboratoryHours,
      topicSelfstudyHours
    );

    res.send({ isAdded: true });
  }
);

router.get("/getRpdTopic", async (req, res) => {
  const result = await rpdController.getRpdTopic({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.get("/getAllRpdTopicByRpdId", async (req, res) => {
  const result = await rpdController.getAllRpdTopicByRpdId({
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
  const {
    rpdId,
    topicId,
    topicTotalHours,
    topicLectionHours,
    topicPracticalHours,
    topicLaboratoryHours,
    topicSelfstudyHours,
  } = req.body;

  const result = await rpdController.updateRpdTopic({
    rpdId,
    topicId,
    topicTotalHours,
    topicLectionHours,
    topicPracticalHours,
    topicLaboratoryHours,
    topicSelfstudyHours,
  });

  res.send(result);
});

module.exports = router;
