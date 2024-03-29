const { dataBase } = require(__dir.libs + "/dataBase");

const addDiscipline = async (
  fullName,
  shortName,
  code,
  cathedra,
  studyField
) => {
  const data = {
    fullName,
    shortName,
    code,
    cathedra,
    studyField,
  };

  return await dataBase("Discipline").insert(data);
};

const getAllDisciplines = () => {
  return dataBase("Discipline").select("*");
};

const getDiscipline = (data) => {
  return dataBase("Discipline").select("*").where(data).first();
};

const deleteDiscipline = (id) => {
  return dataBase("Discipline").del().where(id);
};

const updateDiscipline = async (data) => {
  await dataBase("Discipline").where({ id: data.id }).update(data);
  return await dataBase("Discipline").where({ id: data.id }).first();
};

const addDisciplineTeacher = async (disciplineId, teacherId) => {
  const data = {
    disciplineId,
    teacherId,
  };

  return await dataBase("Discipline_Teacher").insert(data);
};

const getDisciplineTeacher = (data) => {
  return dataBase("Discipline_Teacher").select("*").where(data).first();
};

const deleteDisciplineTeacher = (id) => {
  return dataBase("Discipline_Teacher").del().where(id);
};

const updateDisciplineTeacher = async (data) => {
  await dataBase("Discipline_Teacher")
    .where({ disciplineId: data.disciplineId })
    .update(data);
  return await dataBase("Discipline_Teacher")
    .where({ disciplineId: data.disciplineId })
    .first();
};

const addDisciplineCompetence = async (disciplineId, competenceId) => {
  const data = {
    disciplineId,
    competenceId,
  };

  return await dataBase("Discipline_Competence").insert(data);
};

const getDisciplineCompetence = (data) => {
  return dataBase("Discipline_Competence").select("*").where(data);
};

const deleteDisciplineCompetence = (id) => {
  return dataBase("Discipline_Competence").del().where(id);
};

const updateDisciplineCompetence = async (data) => {
  await dataBase("Discipline_Competence")
    .where({ disciplineId: data.disciplineId })
    .update(data);
  return await dataBase("Discipline_Competence")
    .where({ disciplineId: data.disciplineId })
    .first();
};

module.exports = {
  addDiscipline,
  getAllDisciplines,
  getDiscipline,
  deleteDiscipline,
  updateDiscipline,
  addDisciplineTeacher,
  getDisciplineTeacher,
  deleteDisciplineTeacher,
  updateDisciplineTeacher,
  addDisciplineCompetence,
  getDisciplineCompetence,
  deleteDisciplineCompetence,
  updateDisciplineCompetence,
};
