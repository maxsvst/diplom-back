const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsTopicInDisciplineExist } = require("../helpers/utils");
const topicController = require(__dir.controllers + "/topic");

const router = new Router();

router.post(
  "/addTopic",
  checkSchema({
    disciplineId: {
      isNumeric: { min: 0 },
    },
    topicName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (topicName, request) => {
          disciplineId = request.req.body.disciplineId;
          await checkIsTopicInDisciplineExist(disciplineId, topicName);
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { disciplineId, topicName } = req.body;
    topicController.addTopic(disciplineId, topicName);

    res.send({ isAdded: true });
  }
);

router.get(
  "/getAllTopics",
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
    const result = await topicController.getAllTopics({
      disciplineId: req.query.disciplineId,
    });

    res.send(result);
  }
);

router.get("/getTopic", async (req, res) => {
  const result = await topicController.getTopic({
    topicName: req.query.topicName,
  });

  res.send(result);
});

router.delete("/deleteTopic", async (req, res) => {
  const { id } = req.query;
  await topicController.deleteTopic({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateTopic", async (req, res) => {
  const { id, topicName } = req.body;

  const result = await topicController.updateTopic({
    id,
    topicName,
  });

  res.send(result);
});

module.exports = router;
