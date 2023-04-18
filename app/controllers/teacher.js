const { dataBase } = require(__dir.libs + "/dataBase");
const { generateJWTToken } = require(__dir.libs + "/auth");

const registration = async (fullName, email, password, rank, position) => {
  const data = { fullName, email, password, rank, position };

  return await dataBase("Teacher").insert(data);
  // return generateJWTToken(data);
};

const getTeacher = (data) => {
  return dataBase("Teacher").select("*").where(data).first();
};

const deleteTeacher = (id) => {
  return dataBase("Teacher").del().where(id);
};

const updateTeacher = async (data) => {
  await dataBase("Teacher").where({ id: data.id }).update(data);
  return await dataBase("Teacher").where({ id: data.id }).first();
};

module.exports = {
  registration,
  getTeacher,
  deleteTeacher,
  updateTeacher,
};
