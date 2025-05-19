const { dataBase } = require(__dir.libs + "/dataBase");

const addExamQuestion = async (
  topicId,
  disciplineId,
  examQuestionName,
) => {
  const data = {
    topicId,
    disciplineId,
    examQuestionName,
  };

  return await dataBase("ExamQuestion").insert(data);
};

const getExamQuestion = (data) => {
  return dataBase("ExamQuestion").select("*").where(data).first();
};

const getAllExamQuestions = (data) => {
  const query = dataBase("ExamQuestion").select("*");

  if (data.topicId) {
    query.where({ topicId: data.topicId });
  } else if (data.disciplineId) {
    query.where({ disciplineId: data.disciplineId });
  }

  return query;
};

const deleteExamQuestion = (examQuestionId) => {
  return dataBase("ExamQuestion").del().where(examQuestionId);
};

const updateExamQuestion = async (data) => {
  await dataBase("ExamQuestion").where({ examQuestionId: data.examQuestionId }).update(data);
  return await dataBase("ExamQuestion").where({ examQuestionId: data.examQuestionId }).first();
};

module.exports = {
  addExamQuestion,
  getExamQuestion,
  getAllExamQuestions,
  deleteExamQuestion,
  updateExamQuestion,
};
