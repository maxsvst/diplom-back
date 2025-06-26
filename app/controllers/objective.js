const { dataBase } = require(__dir.libs + "/dataBase");
const { v4: uuidv4 } = require('uuid');

const addObjective = async (disciplineId, objectiveName) => {
    try {
        const objectiveId = uuidv4(); // Генерируем новый UUID

        await dataBase("Objective").insert({ objectiveId, disciplineId, objectiveName });

        return objectiveId;
    } catch (error) {
        console.error('Error adding objective:', error);
        throw error;
    }
};

const getAllObjectives = (data) => {
    return dataBase("Objective").select("*").where(data);
};

const getObjective = (data) => {
    return dataBase("Objective").select("*").where(data).first();
};

const deleteObjective = (objectiveId) => {
    return dataBase("Objective").del().where(objectiveId);
};

module.exports = {
    addObjective,
    getAllObjectives,
    getObjective,
    deleteObjective
};