const { dataBase } = require(__dir.libs + "/dataBase");

const checkIsDisciplineFullnameUnique = async (fullName) => {
  const item = await dataBase("Discipline")
    .select("*")
    .where({ fullName: fullName })
    .first();
  if (item) {
    return Promise.reject("Полное название дисциплины не уникально");
  }
};

const checkIsTopicInDisciplineExist = async (disciplineId, topicName) => {
  const item = await dataBase("Topic")
    .select("*")
    .where({ disciplineId: disciplineId, topicName: topicName })
    .first();
  if (item) {
    return Promise.reject("Такая тема в дисциплине уже существует");
  }
};

const checkIsLaboratoryClassInTopicExist = async (
  topicId,
  laboratoryClassName
) => {
  const item = await dataBase("LaboratoryClass")
    .select("*")
    .where({ topicId: topicId, laboratoryClassName: laboratoryClassName })
    .first();
  if (item) {
    return Promise.reject("Такая лабораторная работа в теме уже существует");
  }
};

const checkIsPracticalClassInTopicExist = async (
  topicId,
  practicalClassName
) => {
  const item = await dataBase("PracticalClass")
    .select("*")
    .where({ topicId: topicId, practicalClassName: practicalClassName })
    .first();
  if (item) {
    return Promise.reject("Такая практическая работа в теме уже существует");
  }
};

const checkIsLectionInTopicExist = async (topicId, lectionName) => {
  const item = await dataBase("Lections")
    .select("*")
    .where({ topicId: topicId, lectionName: lectionName })
    .first();
  if (item) {
    return Promise.reject("Такая лекция в теме уже существует");
  }
};

const checkIsExamQuestionInTopicExist = async (topicId, question) => {
  const item = await dataBase("ExamQuestions")
    .select("*")
    .where({ topicId: topicId, question: question })
    .first();
  if (item) {
    return Promise.reject("Такой вопрос к экзамену теме уже существует");
  }
};

const checkIsCompetenceCodeUnique = async (
  competenceType,
  competenceCode,
  competenceName,
  indicatorCode,
  indicatorName
) => {
  const item = await dataBase("Competence")
    .select("*")
    .where({
      competenceType: competenceType,
      competenceCode: competenceCode,
      competenceName: competenceName,
      indicatorCode: indicatorCode,
      indicatorName: indicatorName,
    })
    .first();
  if (item) {
    return Promise.reject("Такая компетенция уже существует");
  }
};

module.exports = {
  checkIsDisciplineFullnameUnique,
  checkIsTopicInDisciplineExist,
  checkIsLaboratoryClassInTopicExist,
  checkIsPracticalClassInTopicExist,
  checkIsLectionInTopicExist,
  checkIsExamQuestionInTopicExist,
  checkIsCompetenceCodeUnique,
};
