const { dataBase } = require(__dir.libs + "/dataBase");
const { v4: uuidv4 } = require('uuid');

const addCompetence = async (
  disciplineId,
  competenceType,
  competenceCode,
  competenceName,
  indicatorCode,
  indicatorName
) => {
  try {
    const competenceId = uuidv4(); // Генерируем новый UUID

    await dataBase("Competence").insert({
      competenceId,
      competenceType,
      competenceCode,
      competenceName,
      indicatorCode,
      indicatorName,
    });

    // Добавляем связь с дисциплиной в таблицу Discipline_Competence
    if (disciplineId) { // Проверяем, что disciplineId не пустое
      await dataBase("Discipline_Competence").insert({
        competenceId,
        disciplineId,
      });
    }

    return competenceId;
  } catch (error) {
    console.error('Error adding competence:', error);
    throw error;
  }
};

const getUniqueCompetence = (data) => {
  return dataBase("Competence").select("*").where(data).first();
};

const getAllCompetences = (data) => {
  const query = dataBase("Competence")
    .select("Competence.*") // Явно выбираем поля из таблицы Competence
    .leftJoin(
      "Discipline_Competence",
      "Competence.competenceId",
      "Discipline_Competence.competenceId"
    );

  if (data.topicId) {
    // TODO: Add Topic Table and topicID to Competence Table, or make another association table.
    console.warn("Filtering by topicId is not implemented. You need to add a topicID to the Competence table or create an association table Topic_Competence");
    //query.where({ topicId: data.topicId }); // This line needs to be fixed to work
    //throw new Error("TopicId filtering not implemented");
    return Promise.reject(new Error("TopicId filtering not implemented"));
  } else if (data.disciplineId) {
    query.where("Discipline_Competence.disciplineId", data.disciplineId);
  }

  return query;
};

const getCompetences = (data) => {
  return dataBase("Competence").select("*").where(data);
};

const deleteCompetence = (competenceId) => {
  return dataBase("Competence").del().where(competenceId);
};

const updateCompetence = async (data) => {
  await dataBase("Competence").where({ competenceId: data.competenceId }).update(data);
  return await dataBase("Competence").where({ competenceId: data.competenceId }).first();
};

module.exports = {
  addCompetence,
  getUniqueCompetence,
  getAllCompetences,
  getCompetences,
  deleteCompetence,
  updateCompetence,
};
