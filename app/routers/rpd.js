const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const {
  checkIsRpdUnique,
  checkIsRpdCompetenceUnique,
  checkIsRpdLaboratoryClassUnique,
  checkIsRpdPracticalClassUnique,
  checkIsRpdLectionUnique,
  checkIsRpdTopicUnique,
} = require("../helpers/utils");
const rpdController = require(__dir.controllers + "/rpd");

const router = new Router();

router.post(
  "/add-rpd",
  checkSchema({
    disciplineId: {
      isUUID: true,
      errorMessage: 'disciplineId must be a valid UUID v4',
    },
    // disciplineId: {
    //   isNumeric: { min: 0 },
    //   custom: {
    //     options: async (disciplineId, request) => {
    //       (rpdTotalHours = request.req.body.rpdTotalHours),
    //         (rpdLectionHours = request.req.body.rpdLectionHours),
    //         (rpdPracticalHours = request.req.body.rpdPracticalHours),
    //         (rpdLaboratoryHours = request.req.body.rpdLaboratoryHours),
    //         (rpdSelfstudyHours = request.req.body.rpdSelfstudyHours),
    //         (rpdAdditionalHours = request.req.body.rpdAdditionalHours),
    //         (year = request.req.body.year),
    //         await checkIsRpdUnique(
    //           disciplineId,
    //           rpdTotalHours,
    //           rpdLectionHours,
    //           rpdPracticalHours,
    //           rpdLaboratoryHours,
    //           rpdSelfstudyHours,
    //           rpdAdditionalHours,
    //           year
    //         );
    //     },
    //   },
    // },
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
    // rpdDate: {
    //   isDate:{},
    // },
  }),
  async (req, res) => {
    const errors = validationResult(req);

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
      rpdDate,
      controlWeek,
      course,
      semester,
      creditUnits,
      controlWork,
      courseProject,
      credit,
      exam,

    } = req.body;
    try {
      const rpdId = await rpdController.addRpd(
        disciplineId,
        rpdTotalHours,
        rpdLectionHours,
        rpdPracticalHours,
        rpdLaboratoryHours,
        rpdSelfstudyHours,
        rpdAdditionalHours,
        rpdDate,
        controlWeek,
        course,
        semester,
        creditUnits,
        controlWork,
        courseProject,
        credit,
        exam,
      );
      res.status(201).json({ rpdId, isAdded: true });
    } catch (error) {
      console.error("Error in /add-rpd route:", error);
      res.status(500).json({ error: "Failed to add rpd" });
    }
  }
);

router.get(
  "/get-rpd",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await rpdController.getRpd({
      rpdId: req.query.rpdId,
    });

    res.send(result);
  }
);

router.get(
  "/getUniqueRpd",
  checkSchema({
    disciplineId: {
      isUUID: true,
      errorMessage: 'disciplineId must be a valid UUID v4',
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

router.delete("/delete-rpd", async (req, res) => {
  const { id } = req.query;
  await rpdController.deleteRpd({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/update-rpd", async (req, res) => {
  const { id, year } = req.body;

  const result = await rpdController.updateRpd({
    id,
    year,
  });

  res.send(result);
});

router.post(
  "/add-rpd-competence",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
      // custom: {
      //   options: async (rpdId, request) => {
      //     (competenceId = request.req.body.competenceId),
      //       await checkIsRpdCompetenceUnique(rpdId, competenceId);
      //   },
      // },
    },
    competenceId: {
      isUUID: true,
      errorMessage: 'competenceId must be a valid UUID v4',
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

router.get("/get-all-rpd-competence", async (req, res) => {
  const result = await rpdController.getAllRpdCompetence({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.get("/get-rpd-competence", async (req, res) => {
  const result = await rpdController.getRpdCompetence({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/delete-rpd-competence", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdCompetence({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-rpd-competence", async (req, res) => {
  const { rpdId, competenceId } = req.body;

  const result = await rpdController.updateRpdCompetence({
    rpdId,
    competenceId,
  });

  res.send(result);
});

router.post(
  "/add-rpd-laboratory-class",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
      // custom: {
      //   options: async (rpdId, request) => {
      //     (laboratoryClassId = request.req.body.laboratoryClassId),
      //       (laboratoryHours = request.req.body.laboratoryHours),
      //       await checkIsRpdLaboratoryClassUnique(
      //         rpdId,
      //         laboratoryClassId,
      //         laboratoryHours
      //       );
      //   },
      // },
    },
    laboratoryClassId: {
      isUUID: true,
      errorMessage: 'laboratoryClassId must be a valid UUID v4',
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

router.get("/get-all-rpd-laboratory-class", async (req, res) => {
  const result = await rpdController.getAllRpdLaboratoryClass({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.get("/get-rpd-laboratory-class", async (req, res) => {
  const result = await rpdController.getRpdLaboratoryClass({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/delete-rpd-laboratory-class", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdLaboratoryClass({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-rpd-laboratory-class", async (req, res) => {
  const { rpdId, laboratoryClassId } = req.body;

  const result = await rpdController.updateRpdLaboratoryClass({
    rpdId,
    laboratoryClassId,
  });

  res.send(result);
});

router.post(
  "/add-rpd-practical-class",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
      // custom: {
      //   options: async (rpdId, request) => {
      //     (practicalClassId = request.req.body.practicalClassId),
      //       (practicalHours = request.req.body.practicalHours),
      //       await checkIsRpdPracticalClassUnique(
      //         rpdId,
      //         practicalClassId,
      //         practicalHours
      //       );
      //   },
      // },
    },
    practicalClassId: {
      isUUID: true,
      errorMessage: 'practicalClassId must be a valid UUID v4',
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

router.get("/get-all-rpd-practical-class", async (req, res) => {
  const result = await rpdController.getAllRpdPracticalClass({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.get("/get-rpd-practical-class", async (req, res) => {
  const result = await rpdController.getRpdPracticalClass({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/delete-rpd-practical-class", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdPracticalClass({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-rpd-practical-class", async (req, res) => {
  const { rpdId, practicalClassId } = req.body;

  const result = await rpdController.updateRpdPracticalClass({
    rpdId,
    practicalClassId,
  });

  res.send(result);
});

router.post(
  "/add-rpd-lection",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
      // custom: {
      //   options: async (rpdId, request) => {
      //     (lectionId = request.req.body.lectionId),
      //       (lectionHours = request.req.body.lectionHours),
      //       await checkIsRpdLectionUnique(rpdId, lectionId, lectionHours);
      //   },
      // },
    },
    lectionId: {
      isUUID: true,
      errorMessage: 'lectionId must be a valid UUID v4',
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
    rpdController.addRpdLection(rpdId, lectionId, lectionHours);

    res.send({ isAdded: true });
  }
);

router.get("/get-all-rpd-lection", async (req, res) => {
  const result = await rpdController.getAllRpdLection({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.get("/get-rpd-lection", async (req, res) => {
  const result = await rpdController.getRpdLection({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/delete-rpd-lection", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdLection({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-rpd-lection", async (req, res) => {
  const { rpdId, lectionId } = req.body;

  const result = await rpdController.updateRpdLection({
    rpdId,
    lectionId,
  });

  res.send(result);
});

router.post(
  "/add-rpd-topic",
  checkSchema({
    rpdId: {
      isUUID: true,
      errorMessage: 'rpdId must be a valid UUID v4',
      // custom: {
      //   options: async (rpdId, request) => {
      //     (topicId = request.req.body.topicId),
      //       (topicTotalHours = request.req.body.topicTotalHours),
      //       (topicTotalHours = request.req.body.topicTotalHours),
      //       (topicLectionHours = request.req.body.topicLectionHours),
      //       (topicPracticalHours = request.req.body.topicPracticalHours),
      //       (topicLaboratoryHours = request.req.body.topicLaboratoryHours),
      //       (topicSelfstudyHours = request.req.body.topicSelfstudyHours),
      //       await checkIsRpdTopicUnique(
      //         rpdId,
      //         topicId,
      //         topicTotalHours,
      //         topicLectionHours,
      //         topicPracticalHours,
      //         topicLaboratoryHours,
      //         topicSelfstudyHours
      //       );
      //   },
      // },
    },
    topicId: {
      isUUID: true,
      errorMessage: 'topicId must be a valid UUID v4',
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

router.get("/get-rpd-topic", async (req, res) => {
  const result = await rpdController.getRpdTopic({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.get("/get-all-rpd-topic", async (req, res) => {
  const result = await rpdController.getAllRpdTopic({
    rpdId: req.query.rpdId,
  });

  res.send(result);
});

router.delete("/delete-rpd-topic", async (req, res) => {
  const { rpdId } = req.query;
  await rpdController.deleteRpdTopic({
    rpdId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-rpd-topic", async (req, res) => {
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
