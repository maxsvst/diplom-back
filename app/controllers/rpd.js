const { dataBase } = require(__dir.libs + "/dataBase");
const { v4: uuidv4 } = require('uuid');

const addRpd = async (
  disciplineId,
  rpdTotalHours,
  rpdLectionHours,
  rpdPracticalHours,
  rpdLaboratoryHours,
  rpdSelfstudyHours,
  rpdAdditionalHours,
  rpdDate,
  controlWeek,
  course,
  semester,
  creditUnits,
  сontrolWork,
  courseProject,
  credit,
  exam,
) => {
  try {
    const rpdId = uuidv4(); // Генерируем новый UUID

    await dataBase("Rpd").insert({
      rpdId,
      disciplineId,
      rpdTotalHours,
      rpdLectionHours,
      rpdPracticalHours,
      rpdLaboratoryHours,
      rpdSelfstudyHours,
      rpdAdditionalHours,
      rpdDate,
      controlWeek,
      course,
      semester,
      creditUnits,
      сontrolWork,
      courseProject,
      credit,
      exam,
    });

    return rpdId;
  } catch (error) {
    console.error('Error adding rpd:', error);
    throw error;
  }
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

const getAllRpdCompetence = (data) => {
  return dataBase("Rpd_Competence").select("*").where(data);
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

const getAllRpdLaboratoryClass = (data) => {
  return dataBase("Rpd_LaboratoryClass").select("*").where(data);
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

const getAllRpdPracticalClass = (data) => {
  return dataBase("Rpd_PracticalClass").select("*").where(data);
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

const addRpdLection = async (rpdId, lectionId, lectionHours) => {
  const data = {
    rpdId,
    lectionId,
    lectionHours,
  };

  return await dataBase("Rpd_Lection").insert(data);
};

const getAllRpdLection = (data) => {
  return dataBase("Rpd_Lection").select("*").where(data);
};

const getRpdLection = (data) => {
  return dataBase("Rpd_Lection").select("*").where(data).first();
};

const deleteRpdLection = (id) => {
  return dataBase("Rpd_Lection").del().where(id);
};

const updateRpdLection = async (data) => {
  await dataBase("Rpd_Lection").where({ rpdId: data.rpdId }).update(data);
  return await dataBase("Rpd_Lection").where({ rpdId: data.rpdId }).first();
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

const getAllRpdTopic = (data) => {
  return dataBase("Rpd_Topic").select("*").where(data);
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
  getAllRpdCompetence,
  getRpdCompetence,
  deleteRpdCompetence,
  updateRpdCompetence,
  addRpdLaboratoryClass,
  getAllRpdLaboratoryClass,
  getRpdLaboratoryClass,
  deleteRpdLaboratoryClass,
  updateRpdLaboratoryClass,
  addRpdPracticalClass,
  getAllRpdPracticalClass,
  getRpdPracticalClass,
  deleteRpdPracticalClass,
  updateRpdPracticalClass,
  addRpdLection,
  getAllRpdLection,
  getRpdLection,
  deleteRpdLection,
  updateRpdLection,
  addRpdTopic,
  getRpdTopic,
  getAllRpdTopic,
  deleteRpdTopic,
  updateRpdTopic,
};
