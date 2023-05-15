const { dataBase } = require(__dir.libs + "/dataBase");

const addLaboratoryClass = async (
  disciplineId,
  topicId,
  laboratoryClassName
) => {
  const data = {
    disciplineId,
    topicId,
    laboratoryClassName,
  };

  return await dataBase("LaboratoryClass").insert(data);
};

const getAllLaboratoryClasses = (data) => {
  return dataBase("LaboratoryClass").select("*").where(data);
};

const getLaboratoryClass = (data) => {
  return dataBase("LaboratoryClass").select("*").where(data).first();
};

const deleteLaboratoryClass = (id) => {
  return dataBase("LaboratoryClass").del().where(id);
};

const updateLaboratoryClass = async (data) => {
  await dataBase("LaboratoryClass")
    .where({ laboratoryClassId: data.laboratoryClassId })
    .update(data);
  return await dataBase("LaboratoryClass")
    .where({ laboratoryClassId: data.laboratoryClassId })
    .first();
};

module.exports = {
  addLaboratoryClass,
  getAllLaboratoryClasses,
  getLaboratoryClass,
  deleteLaboratoryClass,
  updateLaboratoryClass,
};
