const { dataBase } = require(__dir.libs + "/dataBase");

const addLections = async (disciplineId, name) => {
  const data = {
    disciplineId,
    name,
  };

  return await dataBase("Lections").insert(data);
};

const getLections = (data) => {
  return dataBase("Lections").select("*").where(data).first();
};

const deleteLections = (id) => {
  return dataBase("Lections").del().where(id);
};

const updateLections = async (data) => {
  await dataBase("Lections").where({ id: data.id }).update(data);
  return await dataBase("Lections").where({ id: data.id }).first();
};

module.exports = {
  addLections,
  getLections,
  deleteLections,
  updateLections,
};
