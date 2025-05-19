const { dataBase } = require(__dir.libs + "/dataBase");

const addLection = async (topicId, lectionName) => {
  const data = {
    topicId,
    lectionName,
  };

  return await dataBase("Lection").insert(data);
};

const getLection = (data) => {
  return dataBase("Lection").select("*").where(data).first();
};

const getAllLection = (data) => {
  const query = dataBase("Lection").select("*");

  query.where({ topicId: data.topicId });

  return query;
};

const deleteLection = (lectionId) => {
  return dataBase("Lection").del().where(lectionId);
};

const updateLection = async (data) => {
  await dataBase("Lection").where({ lectionId: data.lectionId }).update(data);
  return await dataBase("Lection").where({ lectionId: data.lectionId }).first();
};

module.exports = {
  addLection,
  getLection,
  getAllLection,
  deleteLection,
  updateLection,
};
