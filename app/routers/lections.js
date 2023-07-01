const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsLectionInTopicExist } = require("../helpers/utils");
const lectionsController = require(__dir.controllers + "/lections");

const router = new Router();

router.post(
  "/addLections",
  checkSchema({
    topicId: {
      isNumeric: { min: 0 },
    },
    lectionName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (lectionName, request) => {
          topicId = request.req.body.topicId;
          await checkIsLectionInTopicExist(topicId, lectionName);
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { disciplineId, topicId, lectionName } = req.body;
    lectionsController.addLections(disciplineId, topicId, lectionName);

    res.send({ isAdded: true });
  }
);

router.get(
  "/getAllLections",
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
    const result = await lectionsController.getAllLections({
      disciplineId: req.query.disciplineId,
    });

    res.send(result);
  }
);

router.get(
  "/getLections",
  checkSchema({
    lectionName: {
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
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const result = await lectionsController.getLections({
      lectionName: req.query.lectionName,
    });

    res.send(result);
  }
);

router.delete("/deleteLections", async (req, res) => {
  const { id } = req.query;
  await lectionsController.deleteLections({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateLections", async (req, res) => {
  const { id, disciplineId, lectionName } = req.body;

  const result = await lectionsController.updateLections({
    id,
    disciplineId,
    lectionName,
  });

  res.send(result);
});

module.exports = router;
