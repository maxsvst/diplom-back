const { dataBase } = require(__dir.libs + "/dataBase");
const { generateJWTToken } = require(__dir.libs + "/auth");

const registration = async (fullName, email, password, rank, position) => {
  const data = { fullName, email, password, rank, position };

  await dataBase("Teacher").insert(data);
  return generateJWTToken(data);
};

module.exports = {
  registration,
};
