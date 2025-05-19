const Router = require("express");
const { checkSchema, validationResult } = require("express-validator");

const { checkIsExamQuestionInTopicExist } = require("../helpers/utils");
const examQuestionController = require(__dir.controllers + "/exam-question");

const router = new Router();

router.post(
  "/add-exam-question",
  checkSchema({
    // topicId: {
    //   isNumeric: { min: 0 },
    // },

    examQuestionName: {
      isString: true,
      isLength: {
        options: {
          min: 1,
        },
      },
      custom: {
        options: async (examQuestionName, request) => {
          topicId = request.req.body.topicId;
          await checkIsExamQuestionInTopicExist(topicId, examQuestionName);
        },
      },
    },
  }),
  (req, res) => {
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    console.log(req.body)
    const { topicId, disciplineId, examQuestionName } = req.body;

    examQuestionController.addExamQuestion(topicId, disciplineId, examQuestionName);

    res.send({ isAdded: true });
  }
);

router.get("/get-exam-question", async (req, res) => {
  const result = await examQuestionController.getExamQuestion({
    question: req.query.examQuestionId,
  });

  res.send(result);
});

router.get("/get-all-exam-questions", async (req, res) => {
  const { topicId, disciplineId } = req.query;
  const result = await examQuestionController.getAllExamQuestions({
    topicId,
    disciplineId,
  });

  res.send(result);
});

router.delete("/delete-exam-question", async (req, res) => {
  const { examQuestionId } = req.query;
  await examQuestionController.deleteExamQuestion({
    examQuestionId,
  });

  res.send({ isDeleted: true });
});

router.put("/update-exam-question", async (req, res) => {
  const { topicId, disciplineId, question } = req.body;

  const result = await examQuestionController.updateExamQuestion({
    topicId,
    disciplineId,
    question,
  });

  res.send(result);
});

module.exports = router;
