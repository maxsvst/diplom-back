const { dataBase } = require(__dir.libs + "/dataBase");

const addRpd = async (
  disciplineId,
  rpdTotalHours,
  rpdLectionHours,
  rpdPracticalHours,
  rpdLaboratoryHours,
  rpdSelfstudyHours,
  rpdAdditionalHours,
  year
) => {
  const data = {
    disciplineId,
    rpdTotalHours,
    rpdLectionHours,
    rpdPracticalHours,
    rpdLaboratoryHours,
    rpdSelfstudyHours,
    rpdAdditionalHours,
    year,
  };

  return await dataBase("Rpd").insert(data);
};

const getRpd = (data) => {
  return dataBase("Rpd").select("*").where(data).first();
};

const deleteRpd = (id) => {
  return dataBase("Rpd").del().where(id);
};

const updateRpd = async (data) => {
  await dataBase("Rpd").where({ id: data.id }).update(data);
  return await dataBase("Rpd").where({ id: data.id }).first();
};

const addRpdCompetence = async (rpdId, competenceId) => {
  const data = {
    rpdId,
    competenceId,
  };

  return await dataBase("Rpd_Competence").insert(data);
};

const getRpdCompetence = (data) => {
  return dataBase("Rpd_Competence").select("*").where(data).first();
};

const deleteRpdCompetence = (id) => {
  return dataBase("Rpd_Competence").del().where(id);
};

const updateRpdCompetence = async (data) => {
  await dataBase("Rpd_Competence").where({ rpdId: data.rpdId }).update(data);
  return await dataBase("Rpd_Competence").where({ rpdId: data.rpdId }).first();
};

const addRpdLaboratoryClass = async (
  rpdId,
  laboratoryClassId,
  laboratoryHours
) => {
  const data = {
    rpdId,
    laboratoryClassId,
    laboratoryHours,
  };

  return await dataBase("Rpd_LaboratoryClass").insert(data);
};

const getRpdLaboratoryClass = (data) => {
  return dataBase("Rpd_LaboratoryClass").select("*").where(data).first();
};

const deleteRpdLaboratoryClass = (id) => {
  return dataBase("Rpd_LaboratoryClass").del().where(id);
};

const updateRpdLaboratoryClass = async (data) => {
  await dataBase("Rpd_LaboratoryClass")
    .where({ rpdId: data.rpdId })
    .update(data);
  return await dataBase("Rpd_LaboratoryClass")
    .where({ rpdId: data.rpdId })
    .first();
};

const addRpdPracticalClass = async (
  rpdId,
  practicalClassId,
  practicalHours
) => {
  const data = {
    rpdId,
    practicalClassId,
    practicalHours,
  };

  return await dataBase("Rpd_PracticalClass").insert(data);
};

const getRpdPracticalClass = (data) => {
  return dataBase("Rpd_PracticalClass").select("*").where(data).first();
};

const deleteRpdPracticalClass = (id) => {
  return dataBase("Rpd_PracticalClass").del().where(id);
};

const updateRpdPracticalClass = async (data) => {
  await dataBase("Rpd_PracticalClass")
    .where({ rpdId: data.rpdId })
    .update(data);
  return await dataBase("Rpd_PracticalClass")
    .where({ rpdId: data.rpdId })
    .first();
};

const addRpdLections = async (rpdId, lectionId, lectionHours) => {
  const data = {
    rpdId,
    lectionId,
    lectionHours,
  };

  return await dataBase("Rpd_Lections").insert(data);
};

const getRpdLections = (data) => {
  return dataBase("Rpd_Lections").select("*").where(data).first();
};

const deleteRpdLections = (id) => {
  return dataBase("Rpd_Lections").del().where(id);
};

const updateRpdLections = async (data) => {
  await dataBase("Rpd_Lections").where({ rpdId: data.rpdId }).update(data);
  return await dataBase("Rpd_Lections").where({ rpdId: data.rpdId }).first();
};

const addRpdTopic = async (
  rpdId,
  topicId,
  topicTotalHours,
  topicLectionHours,
  topicPracticalHours,
  topicLaboratoryHours,
  topicSelfstudyHours
) => {
  const data = {
    rpdId,
    topicId,
    topicTotalHours,
    topicLectionHours,
    topicPracticalHours,
    topicLaboratoryHours,
    topicSelfstudyHours,
  };

  return await dataBase("Rpd_Topic").insert(data);
};

const getRpdTopic = (data) => {
  return dataBase("Rpd_Topic").select("*").where(data).first();
};

const deleteRpdTopic = (id) => {
  return dataBase("Rpd_Topic").del().where(id);
};

const updateRpdTopic = async (data) => {
  await dataBase("Rpd_Topic").where({ rpdId: data.rpdId }).update(data);
  return await dataBase("Rpd_Topic").where({ rpdId: data.rpdId }).first();
};

module.exports = {
  addRpd,
  getRpd,
  deleteRpd,
  updateRpd,
  addRpdCompetence,
  getRpdCompetence,
  deleteRpdCompetence,
  updateRpdCompetence,
  addRpdLaboratoryClass,
  getRpdLaboratoryClass,
  deleteRpdLaboratoryClass,
  updateRpdLaboratoryClass,
  addRpdPracticalClass,
  getRpdPracticalClass,
  deleteRpdPracticalClass,
  updateRpdPracticalClass,
  addRpdLections,
  getRpdLections,
  deleteRpdLections,
  updateRpdLections,
  addRpdTopic,
  getRpdTopic,
  deleteRpdTopic,
  updateRpdTopic,
};
