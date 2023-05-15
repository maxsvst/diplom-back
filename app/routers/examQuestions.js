const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsExamQuestionInTopicExist } = require("../helpers/utils");
const examQuestionsController = require(__dir.controllers + "/examQuestions");

const router = new Router();

router.post(
  "/addExamQuestions",
  checkSchema({
    topicId: {
      isNumeric: { min: 0 },
    },
    question: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (question, request) => {
          topicId = request.req.body.topicId;
          await checkIsExamQuestionInTopicExist(topicId, question);
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });
    const { disciplineId, topicId, question } = req.body;

    examQuestionsController.addExamQuestions(disciplineId, topicId, question);

    res.send({ isAdded: true });
  }
);

router.get("/getExamQuestions", async (req, res) => {
  const result = await examQuestionsController.getExamQuestions({
    question: req.query.question,
  });

  res.send(result);
});

router.delete("/deleteExamQuestions", async (req, res) => {
  const { id } = req.query;
  await examQuestionsController.deleteExamQuestions({
    id,
  });

  res.send({ isDeleted: true });
});

router.put("/updateExamQuestions", async (req, res) => {
  const { id, disciplineId, question } = req.body;

  const result = await examQuestionsController.updateExamQuestions({
    id,
    disciplineId,
    question,
  });

  res.send(result);
});

module.exports = router;
