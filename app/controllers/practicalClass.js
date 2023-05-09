const { dataBase } = require(__dir.libs + "/dataBase");

const addPracticalClass = async (disciplineId, topicId, practicalClassName) => {
  const data = {
    disciplineId,
    topicId,
    practicalClassName,
  };

  return await dataBase("PracticalClass").insert(data);
};

const getPracticalClass = (data) => {
  return dataBase("PracticalClass").select("*").where(data).first();
};

const deletePracticalClass = (id) => {
  return dataBase("PracticalClass").del().where(id);
};

const updatePracticalClass = async (data) => {
  await dataBase("PracticalClass")
    .where({ practicalClassId: data.practicalClassId })
    .update(data);
  return await dataBase("PracticalClass")
    .where({ practicalClassId: data.practicalClassId })
    .first();
};

module.exports = {
  addPracticalClass,
  getPracticalClass,
  deletePracticalClass,
  updatePracticalClass,
};
