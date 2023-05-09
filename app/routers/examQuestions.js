const Router = require("express");
const examQuestionsController = require(__dir.controllers + "/examQuestions");

const router = new Router();

router.post("/addExamQuestions", (req, res) => {
  const { disciplineId, topicId, question } = req.body;

  examQuestionsController.addExamQuestions(disciplineId, topicId, question);

  res.send({ isAdded: true });
});

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
