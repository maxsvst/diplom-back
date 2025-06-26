const { dataBase } = require(__dir.libs + "/dataBase");
const { v4: uuidv4 } = require('uuid');

const addPurpose = async (disciplineId, purposeName) => {
    try {
        const purposeId = uuidv4(); // Генерируем новый UUID

        await dataBase("Purpose").insert({ purposeId, disciplineId, purposeName });

        return purposeId;
    } catch (error) {
        console.error('Error adding purpose:', error);
        throw error;
    }
};

const getAllPurposes = (data) => {
    return dataBase("Purpose").select("*").where(data);
};

const getPurpose = (data) => {
    return dataBase("Purpose").select("*").where(data).first();
};

const deletePurpose = (purposeId) => {
    return dataBase("Purpose").del().where(purposeId);
};

module.exports = {
    addPurpose,
    getAllPurposes,
    getPurpose,
    deletePurpose,
};