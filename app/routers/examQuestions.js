const Router = require("express");
const examQuestionsController = require(__dir.controllers + "/examQuestions");

const router = new Router();

router.post("/addExamQuestions", (req, res) => {
  const { disciplineId, question } = req.body;
  
  examQuestionsController.addExamQuestions(disciplineId, question);

  res.send({ isAdded: true });
});

router.get("/getExamQuestions", async (req, res) => {
  const result = await examQuestionsController.getExamQuestions({
    disciplineId: req.query.disciplineId,
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
