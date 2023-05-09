const { dataBase } = require(__dir.libs + "/dataBase");

const addTopic = async (disciplineId, topicName) => {
  const data = {
    disciplineId,
    topicName,
  };

  return await dataBase("Topic").insert(data);
};

const getTopic = (data) => {
  return dataBase("Topic").select("*").where(data).first();
};

const deleteTopic = (id) => {
  return dataBase("Topic").del().where(id);
};

const updateTopic = async (data) => {
  await dataBase("Topic").where({ id: data.id }).update(data);
  return await dataBase("Topic").where({ id: data.id }).first();
};

module.exports = {
  addTopic,
  getTopic,
  deleteTopic,
  updateTopic,
};
