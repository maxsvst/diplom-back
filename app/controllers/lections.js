const { dataBase } = require(__dir.libs + "/dataBase");

const addLections = async (disciplineId, topicId, lectionName) => {
  const data = {
    disciplineId,
    topicId,
    lectionName,
  };

  return await dataBase("Lections").insert(data);
};

const getAllLections = (data) => {
  return dataBase("Lections").select("*").where(data);
};

const getLections = (data) => {
  return dataBase("Lections").select("*").where(data).first();
};

const deleteLections = (id) => {
  return dataBase("Lections").del().where(id);
};

const updateLections = async (data) => {
  await dataBase("Lections").where({ id: data.id }).update(data);
  return await dataBase("Lections").where({ id: data.id }).first();
};

module.exports = {
  addLections,
  getAllLections,
  getLections,
  deleteLections,
  updateLections,
};
