const { dataBase } = require(__dir.libs + "/dataBase");
const { v4: uuidv4 } = require('uuid');

class DisciplineController {
  async addDiscipline(fullName,
    code,
    profileName,
    studyField,
    studyFieldCode) {

    try {
      const disciplineId = uuidv4(); // Генерируем новый UUID

      await dataBase("Discipline").insert({
        disciplineId,
        fullName,
        code,
        profileName,
        studyField,
        studyFieldCode
      });

      return disciplineId;
    } catch (error) {
      console.error('Error adding discipline:', error);
      throw error;
    }
  }

  async getAllDisciplines() {
    try {
      return await dataBase("Discipline").select("*");
    } catch (error) {
      throw new Error(`Failed to get all disciplines: ${error.message}`);
    }
  }

  // async getDiscipline(criteria) {
  //   try {
  //     return await dataBase("Discipline").select("*").where(criteria).first();
  //   } catch (error) {
  //     throw new Error(`Failed to get discipline: ${error.message}`);
  //   }
  // }

  async getDiscipline(data) {
    return dataBase("Discipline").select("*").where(data).first();
  }

  async deleteDiscipline(disciplineId) {
    try {
      const deleted = await dataBase("Discipline")
        .where({ disciplineId })
        .del()
        .returning('*');

      if (!deleted.length) {
        throw new Error('Discipline not found');
      }

      return deleted[0];
    } catch (error) {
      throw new Error(`Failed to delete discipline: ${error.message}`);
    }
  }

  async updateDiscipline(data) {
    try {
      const { disciplineId, ...updateData } = data;

      const updated = await dataBase("Discipline")
        .where({ disciplineId })
        .update(updateData)
        .returning('*');

      if (!updated.length) {
        throw new Error('Discipline not found');
      }

      return updated[0];
    } catch (error) {
      throw new Error(`Failed to update discipline: ${error.message}`);
    }
  }

  async addDisciplineTeacher(disciplineId, teacherId) {
    try {
      const data = { disciplineId, teacherId };
      const [id] = await dataBase("Discipline_Teacher").insert(data).returning('id');
      return await this.getDisciplineTeacher({ id });
    } catch (error) {
      throw new Error(`Failed to add discipline teacher: ${error.message}`);
    }
  }

  async getDisciplineTeacher(criteria) {
    try {
      return await dataBase("Discipline_Teacher").select("*").where(criteria).first();
    } catch (error) {
      throw new Error(`Failed to get discipline teacher: ${error.message}`);
    }
  }

  async deleteDisciplineTeacher(disciplineId) {
    try {
      const deleted = await dataBase("Discipline_Teacher")
        .where({ disciplineId })
        .del()
        .returning('*');

      if (!deleted.length) {
        throw new Error('Discipline teacher not found');
      }

      return deleted[0];
    } catch (error) {
      throw new Error(`Failed to delete discipline teacher: ${error.message}`);
    }
  }

  async updateDisciplineTeacher(data) {
    try {
      const { disciplineId, ...updateData } = data;

      const updated = await dataBase("Discipline_Teacher")
        .where({ disciplineId })
        .update(updateData)
        .returning('*');

      if (!updated.length) {
        throw new Error('Discipline teacher not found');
      }

      return updated[0];
    } catch (error) {
      throw new Error(`Failed to update discipline teacher: ${error.message}`);
    }
  }

  async addDisciplineCompetence(disciplineId, competenceId) {
    try {
      const data = { disciplineId, competenceId };
      const [id] = await dataBase("Discipline_Competence").insert(data).returning('id');
      return await this.getDisciplineCompetence({ id });
    } catch (error) {
      throw new Error(`Failed to add discipline competence: ${error.message}`);
    }
  }

  async getDisciplineCompetence(criteria) {
    try {
      return await dataBase("Discipline_Competence").select("*").where(criteria);
    } catch (error) {
      throw new Error(`Failed to get discipline competence: ${error.message}`);
    }
  }

  async deleteDisciplineCompetence(disciplineId) {
    try {
      const deleted = await dataBase("Discipline_Competence")
        .where({ disciplineId })
        .del()
        .returning('*');

      if (!deleted.length) {
        throw new Error('Discipline competence not found');
      }

      return deleted[0];
    } catch (error) {
      throw new Error(`Failed to delete discipline competence: ${error.message}`);
    }
  }

  async updateDisciplineCompetence(data) {
    try {
      const { disciplineId, ...updateData } = data;

      const updated = await dataBase("Discipline_Competence")
        .where({ disciplineId })
        .update(updateData)
        .returning('*');

      if (!updated.length) {
        throw new Error('Discipline competence not found');
      }

      return updated[0];
    } catch (error) {
      throw new Error(`Failed to update discipline competence: ${error.message}`);
    }
  }
}

module.exports = new DisciplineController();
