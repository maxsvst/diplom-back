const { dataBase } = require(__dir.libs + "/dataBase");

const addPracticalClass = async (topicId, practicalClassName) => {
  const data = {
    topicId,
    practicalClassName,
  };

  return await dataBase("PracticalClass").insert(data);
};

const getPracticalClass = (data) => {
  return dataBase("PracticalClass").select("*").where(data).first();
};

const getAllPracticalClass = (data) => {
  const query = dataBase("PracticalClass").select("*");

  query.where({ topicId: data.topicId });

  return query;
};

const deletePracticalClass = (practicalClassId) => {
  return dataBase("PracticalClass").del().where(practicalClassId);
};

const updatePracticalClass = async (data) => {
  await dataBase("PracticalClass").where({ practicalClassId: data.practicalClassId }).update(data);
  return await dataBase("PracticalClass").where({ practicalClassId: data.practicalClassId }).first();
};

module.exports = {
  addPracticalClass,
  getPracticalClass,
  getAllPracticalClass,
  deletePracticalClass,
  updatePracticalClass,
};
