const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsTopicInDisciplineExist } = require("../helpers/utils");
const topicController = require(__dir.controllers + "/topic");

const router = new Router();

router.post(
  "/add-topic",
  checkSchema({
    disciplineId: {
      isUUID: true,
      errorMessage: 'disciplineId must be a valid UUID v4',
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
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });


    const { disciplineId, topicName } = req.body;

    try {
      const topicId = await topicController.addTopic(disciplineId, topicName);
      res.status(201).json({ topicId, isAdded: true });
    } catch (error) {
      console.error("Error in /add-topic route:", error);
      res.status(500).json({ error: "Failed to add competence" });
    }
  }
);

router.get(
  "/get-all-topics",
  checkSchema({
    isUUID: { options: { version: '4' } },
    errorMessage: 'disciplineId must be a valid UUID v4',
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

router.get("/get-topic", async (req, res) => {
  const result = await topicController.getTopic({
    topicId: req.query.topicId,
  });

  res.send(result);
});

router.delete("/delete-topic", async (req, res) => {
  const { topicId } = req.query;
  await topicController.deleteTopic({
    topicId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-topic", async (req, res) => {
  const { topicId, topicName } = req.body;

  const result = await topicController.updateTopic({
    topicId,
    topicName,
  });

  res.send(result);
});

module.exports = router;
