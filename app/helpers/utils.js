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

const checkIsRpdUnique = async (
  disciplineId,
  rpdTotalHours,
  rpdLectionHours,
  rpdPracticalHours,
  rpdLaboratoryHours,
  rpdSelfstudyHours,
  rpdAdditionalHours,
  year
) => {
  const disciplineIdExist = await dataBase("Discipline")
    .select("*")
    .where({
      id: disciplineId,
    })
    .first();

  const item = await dataBase("Rpd")
    .select("*")
    .where({
      disciplineId: disciplineId,
      rpdTotalHours: rpdTotalHours,
      rpdLectionHours: rpdLectionHours,
      rpdPracticalHours: rpdPracticalHours,
      rpdLaboratoryHours: rpdLaboratoryHours,
      rpdSelfstudyHours: rpdSelfstudyHours,
      rpdAdditionalHours: rpdAdditionalHours,
      year,
    })
    .first();
  if (!disciplineIdExist) {
    return Promise.reject("Такой дисциплины не существует");
  } else if (item) {
    return Promise.reject("Такая РПД уже существует");
  }
};

const checkIsRpdCompetenceUnique = async (rpdId, competenceId) => {
  const rpdIdExist = await dataBase("Rpd")
    .select("*")
    .where({
      id: rpdId,
    })
    .first();

  const competenceIdExist = await dataBase("Competence")
    .select("*")
    .where({
      id: competenceId,
    })
    .first();

  const item = await dataBase("Rpd_Competence")
    .select("*")
    .where({
      rpdId,
      competenceId,
    })
    .first();

  if (!rpdIdExist) {
    return Promise.reject("Такой РПД не существует");
  } else if (!competenceIdExist) {
    return Promise.reject("Такой компетенции не существует");
  } else if (item) {
    return Promise.reject("Такая запись в Rpd_Competence уже существует");
  }
};

const checkIsRpdLaboratoryClassUnique = async (
  rpdId,
  laboratoryClassId,
  laboratoryHours
) => {
  const rpdIdExist = await dataBase("Rpd")
    .select("*")
    .where({
      id: rpdId,
    })
    .first();

  const laboratoryClassIdExist = await dataBase("LaboratoryClass")
    .select("*")
    .where({
      laboratoryClassId,
    })
    .first();

  const item = await dataBase("Rpd_LaboratoryClass")
    .select("*")
    .where({
      rpdId,
      laboratoryClassId,
      laboratoryHours,
    })
    .first();
  if (!rpdIdExist) {
    return Promise.reject("Такой РПД не существует");
  } else if (!laboratoryClassIdExist) {
    return Promise.reject("Такого ЛЗ не существует");
  } else if (item) {
    return Promise.reject("Такая запись в Rpd_LaboratoryClass уже существует");
  }
};

const checkIsRpdPracticalClassUnique = async (
  rpdId,
  practicalClassId,
  practicalHours
) => {
  const rpdIdExist = await dataBase("Rpd")
    .select("*")
    .where({
      id: rpdId,
    })
    .first();

  const practicalClassIdExist = await dataBase("PracticalClass")
    .select("*")
    .where({
      practicalClassId,
    })
    .first();

  const item = await dataBase("Rpd_PracticalClass")
    .select("*")
    .where({
      rpdId,
      practicalClassId,
      practicalHours,
    })
    .first();
  if (!rpdIdExist) {
    return Promise.reject("Такой РПД не существует");
  } else if (!practicalClassIdExist) {
    return Promise.reject("Такого ПЗ не существует");
  } else if (item) {
    return Promise.reject("Такая запись в Rpd_PracticalClass уже существует");
  }
};

const checkIsRpdLectionsUnique = async (rpdId, lectionId, lectionHours) => {
  const rpdIdExist = await dataBase("Rpd")
    .select("*")
    .where({
      id: rpdId,
    })
    .first();

  const lectionIdExist = await dataBase("Lections")
    .select("*")
    .where({
      id: lectionId,
    })
    .first();

  const item = await dataBase("Rpd_Lections")
    .select("*")
    .where({
      rpdId,
      lectionId,
      lectionHours,
    })
    .first();
  if (!rpdIdExist) {
    return Promise.reject("Такой РПД не существует");
  } else if (!lectionIdExist) {
    return Promise.reject("Такой лекции не существует");
  } else if (item) {
    return Promise.reject("Такая запись в Rpd_Lections уже существует");
  }
};

const checkIsRpdTopicUnique = async (
  rpdId,
  topicId,
  topicTotalHours,
  topicLectionHours,
  topicPracticalHours,
  topicLaboratoryHours,
  topicSelfstudyHours
) => {
  const rpdIdExist = await dataBase("Rpd")
    .select("*")
    .where({
      id: rpdId,
    })
    .first();

  const topicIdExist = await dataBase("Topic")
    .select("*")
    .where({
      id: topicId,
    })
    .first();

  const item = await dataBase("Rpd_Topic")
    .select("*")
    .where({
      rpdId,
      topicId,
      topicTotalHours,
      topicLectionHours,
      topicPracticalHours,
      topicLaboratoryHours,
      topicSelfstudyHours,
    })
    .first();
  if (!rpdIdExist) {
    return Promise.reject("Такой РПД не существует");
  } else if (!topicIdExist) {
    return Promise.reject("Такой темы не существует");
  } else if (item) {
    return Promise.reject("Такая запись в Rpd_Topic уже существует");
  }
};

const checkIsDisciplineCompetenceUnique = async (
  disciplineId,
  competenceId
) => {
  const disciplineIdExist = await dataBase("Discipline")
    .select("*")
    .where({
      id: disciplineId,
    })
    .first();

  const competenceIdExist = await dataBase("Competence")
    .select("*")
    .where({
      id: competenceId,
    })
    .first();

  const item = await dataBase("Discipline_Competence")
    .select("*")
    .where({
      disciplineId,
      competenceId,
    })
    .first();
  if (!disciplineIdExist) {
    return Promise.reject("Такой дисциплины не существует");
  } else if (!competenceIdExist) {
    return Promise.reject("Такой компетенции не существует");
  } else if (item) {
    return Promise.reject(
      "Такая запись в Discipline_Competence уже существует"
    );
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
  checkIsRpdUnique,
  checkIsRpdCompetenceUnique,
  checkIsRpdLaboratoryClassUnique,
  checkIsRpdPracticalClassUnique,
  checkIsRpdLectionsUnique,
  checkIsRpdTopicUnique,
  checkIsDisciplineCompetenceUnique,
};
