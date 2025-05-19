const { dataBase } = require(__dir.libs + "/dataBase");
const { generateJWTToken } = require(__dir.libs + "/auth");

// const registration = async (fullName, email, password, rank, position) => {
//   const data = { fullName, email, password, rank, position };

//   try {
//     const competenceId = uuidv4()

//     await dataBase("Competence").insert({
//      fullName, email, password, rank, position
//     });

//     return competenceId
//   } catch (error) {
//     console.error('Error adding competence:', error)
//     throw error
//   }

//   return await dataBase("Teacher").insert(data);
//   // return generateJWTToken(data);
// };

const getTeacher = (data) => {
  return dataBase("Teacher").select("*").where(data).first();
};

const deleteTeacher = (teacherId) => {
  return dataBase("Teacher").del().where(teacherId);
};

// const updateTeacher = async (data) => {
//   await dataBase("Teacher").where({ teacherd: data.teacherId }).update(data);
//   return await dataBase("Teacher").where({ teacherId: data.teacherId }).first();
// };

const updateTeacher = async (updateData) => {
  const { teacherId, ...dataToUpdate } = updateData;
  try {
    const result = await dataBase("Teacher")
      .where({ teacherId: updateData.teacherId })
      .update(dataToUpdate); // Используем .update()

    if (result === 0) {
      return null; // Если ничего не обновилось, значит, преподаватель не найден (или ошибка)
    }

    // Получаем обновленные данные, чтобы вернуть их клиенту
    const updatedTeacher = await dataBase("Teacher")
      .where({ teacherId: updateData.teacherId })
      .first();

    return updatedTeacher; // Возвращаем обновленный объект
  } catch (error) {
    console.error("Error updating teacher:", error);
    throw error;
  }
};

module.exports = {
  getTeacher,
  deleteTeacher,
  updateTeacher,
};
