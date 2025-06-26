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

router.post(
  "/add-topics",
  checkSchema({
    disciplineId: {
      isUUID: true,
      errorMessage: 'disciplineId must be a valid UUID v4',
    },
    topics: {
      isArray: true,
      errorMessage: 'topics must be an array',
      notEmpty: true,
      custom: {
        options: async (topics, { req }) => {
          const disciplineId = req.body.disciplineId;
          for (const topicName of topics) {
            if (typeof topicName !== 'string' || topicName.length < 1) {
              throw new Error('topicName must be a non-empty string'); // Валидация внутри массива
            }
            await checkIsTopicInDisciplineExist(disciplineId, topicName);
          }
        },
      },
    },
  }),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const { disciplineId, topics } = req.body;

    try {
      const topicIds = []; // Массив для хранения ID добавленных тем
      for (const topicName of topics) {
        const topicId = await topicController.addTopic(disciplineId, topicName);
        topicIds.push(topicId);
      }
      res.status(201).json({ topicIds, isAdded: true }); // Возвращаем массив ID
    } catch (error) {
      console.error("Error in /add-topics route:", error);
      res.status(500).json({ error: "Failed to add topics" });
    }
  }
);

router.get(
  "/get-all-topics",
  checkSchema({
    disciplineId: {
      isUUID: true,
      errorMessage: 'disciplineId must be a valid UUID v4',
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
