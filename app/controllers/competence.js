const { dataBase } = require(__dir.libs + "/dataBase");

const addCompetence = async (
  competenceType,
  competenceCode,
  competenceName,
  indicatorCode,
  indicatorName
) => {
  const data = {
    competenceType,
    competenceCode,
    competenceName,
    indicatorCode,
    indicatorName,
  };

  return await dataBase("Competence").insert(data);
};

const getCompetence = (data) => {
  return dataBase("Competence").select("*").where(data).first();
};

const deleteCompetence = (id) => {
  return dataBase("Competence").del().where(id);
};

const updateCompetence = async (data) => {
  await dataBase("Competence").where({ id: data.id }).update(data);
  return await dataBase("Competence").where({ id: data.id });
};

module.exports = {
  addCompetence,
  getCompetence,
  deleteCompetence,
  updateCompetence,
};