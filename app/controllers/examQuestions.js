const { dataBase } = require(__dir.libs + "/dataBase");

const addExamQuestions = async (disciplineId, topicId, question) => {
  const data = {
    disciplineId,
    topicId,
    question,
  };

  return await dataBase("ExamQuestions").insert(data);
};

const getExamQuestions = (data) => {
  return dataBase("ExamQuestions").select("*").where(data).first();
};

const deleteExamQuestions = (id) => {
  return dataBase("ExamQuestions").del().where(id);
};

const updateExamQuestions = async (data) => {
  await dataBase("ExamQuestions").where({ id: data.id }).update(data);
  return await dataBase("ExamQuestions").where({ id: data.id }).first();
};

module.exports = {
  addExamQuestions,
  getExamQuestions,
  deleteExamQuestions,
  updateExamQuestions,
};
