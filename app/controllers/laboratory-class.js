const { dataBase } = require(__dir.libs + "/dataBase");

const addLaboratoryClass = async (
  topicId,
  laboratoryClassName
) => {
  const data = {
    topicId,
    laboratoryClassName,
  };

  return await dataBase("LaboratoryClass").insert(data);
};

const getAllLaboratoryClass = (data) => {
  const query = dataBase("LaboratoryClass").select("*");

  query.where({ topicId: data.topicId });

  return query;
};

const getLaboratoryClass = (data) => {
  return dataBase("LaboratoryClass").select("*").where(data).first();
};

const deleteLaboratoryClass = (laboratoryClassId) => {
  return dataBase("LaboratoryClass").del().where(laboratoryClassId);
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
  getAllLaboratoryClass,
  getLaboratoryClass,
  deleteLaboratoryClass,
  updateLaboratoryClass,
};
