const { dataBase } = require(__dir.libs + "/dataBase");
const { v4: uuidv4 } = require('uuid');

const addTopic = async (disciplineId, topicName) => {
  try {
    const topicId = uuidv4(); // Генерируем новый UUID

    await dataBase("Topic").insert({ topicId, disciplineId, topicName });

    return topicId;
  } catch (error) {
    console.error('Error adding topic:', error);
    throw error;
  }
};

const getAllTopics = (data) => {
  return dataBase("Topic").select("*").where(data);
};

const getTopic = (data) => {
  console.log('controller', data)
  return dataBase("Topic").select("*").where(data).first();
};

const deleteTopic = (topicId) => {
  return dataBase("Topic").del().where(topicId);
};

const updateTopic = async (data) => {
  await dataBase("Topic").where({ topicId: data.topicId }).update(data);
  return await dataBase("Topic").where({ topicId: data.topicId }).first();
};

module.exports = {
  addTopic,
  getAllTopics,
  getTopic,
  deleteTopic,
  updateTopic,
};
