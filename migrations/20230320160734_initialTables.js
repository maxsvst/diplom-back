exports.up = async function (knex) {
  await knex.schema.createTable("Teacher", function (table) {
    table.increments("id").primary();
    table.string("fullName").unique().notNullable(); // Делать ли уникальным
    table.string("email").unique().notNullable(); // Нужен ли здесь имейл и пароль
    table.string("password").notNullable(); // Нужен ли здесь имейл и пароль
    table.string("rank").notNullable();
    table.enu("position", [
      "Ассистент",
      "Преподаватель", 
      "Старший преподаватель", 
      "Доцент", 
      "Профессор",
    ]);
  });

  await knex.schema.createTable("Discipline", function (table) {
    table.increments("id").primary();
    table.string("fullName").notNullable(); // Уникально ли название дисциплины
    table.string("shortName").notNullable(); // Уникально ли название дисциплины
    table.string("code").notNullable().unique();
    table.string("cathedra").notNullable();
    table.string("studyField").notNullable();
  });

  await knex.schema.createTable("Discipline_Teacher", function (table) {
    table.integer("teacherId").primary();
    table.integer("disciplineId").primary();

    table.foreign("teacherId")
        .references("id")
        .inTable("Teacher"); // Каскадное даление и добавление

    table.foreign("disciplineId")
        .references("id")
        .inTable("Discipline"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("ExamQuestions", function (table) {
    table.increments("id").primary();
    table.integer("disciplineId").notNullable();
    table.string("question").notNullable();

    table.foreign("disciplineId")
        .references("id")
        .inTable("Discipline");
  });

  await knex.schema.createTable("Lections", function (table) {
    table.increments("id").primary();
    table.integer("disciplineId").notNullable();
    table.string("name").notNullable();

    table.foreign("disciplineId")
        .references("id")
        .inTable("Discipline"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("Rpd", function (table) {
    table.increments("id").primary();
    table.integer("year").notNullable();
  });

  await knex.schema.createTable("Rpd_Lections", function (table) {
    table.integer("rpdId").primary();
    table.integer("lectionsId").primary();

    table.foreign("rpdId")
        .references("id")
            .inTable("Rpd"); // Каскадное даление и добавление

    table.foreign("lectionsId")
        .references("id")
        .inTable("Lections"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("PracticalClass", function (table) {
    table.increments("practicalClassId").primary();
    table.integer("disciplineId");
    table.string("practicalClassName").notNullable();

    table.foreign("disciplineId")
        .references("id")
        .inTable("Discipline"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("Rpd_PracticalClass", function (table) {
    table.integer("rpdId").primary();
    table.integer("practicalClassId").primary();

    table.foreign("rpdId")
        .references("id")
        .inTable("Rpd"); // Каскадное даление и добавление

    table.foreign("practicalClassId")
      .references("practicalClassId")
      .inTable("PracticalClass"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("LaboratoryClass", function (table) {
    table.increments("laboratoryClassId").primary();
    table.integer("disciplineId");
    table.string("laboratoryClassName").notNullable();

    table.foreign("disciplineId")
        .references("id")
        .inTable("Discipline"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("Rpd_LaboratoryClass", function (table) {
    table.integer("rpdId").primary();
    table.integer("laboratoryClassId").primary();

    table.foreign("rpdId")
        .references("id")
        .inTable("Rpd"); // Каскадное даление и добавление

    table
      .foreign("laboratoryClassId")
      .references("laboratoryClassId")
      .inTable("LaboratoryClass"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("Topic", function (table) {
    table.increments("id").primary();
    table.string("topicName").notNullable();
  });

  await knex.schema.createTable("Rpd_Topic", function (table) {
    table.integer("rpdId").primary();
    table.integer("topicId").primary();
    table.integer("semester").notNullable();
    table.integer("totalHours").notNullable();
    table.integer("selfstudyHours").notNullable();

    table.foreign("rpdId")
        .references("id")
        .inTable("Rpd"); // Каскадное даление и добавление

    table.foreign("topicId")
        .references("id")
        .inTable("Topic"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("Competence", function (table) {
    table.increments("id").primary();
    table.string("competenceType").notNullable();
    table.string("competenceCode").notNullable();
    table.string("competenceName").notNullable();
    table.string("indicatorCode").notNullable();
    table.string("indicatorName").notNullable();
  });

  await knex.schema.createTable("Rpd_Competence", function (table) {
    table.integer("rpdId").primary();
    table.integer("competenceId").primary();

    table.foreign("rpdId")
        .references("id")
        .inTable("Rpd"); // Каскадное даление и добавление

    table.foreign("competenceId")
        .references("id")
        .inTable("Competence"); // Каскадное даление и добавление
  });

  await knex.schema.createTable("Topic_Competence", function (table) {
    table.integer("competenceId").primary();
    table.integer("topicId").primary();

    table.foreign("competenceId")
        .references("id")
        .inTable("Competence"); // Каскадное даление и добавление

    table.foreign("topicId")
        .references("id")
        .inTable("Topic"); // Каскадное даление и добавление
  });
};

exports.down = function (knex) {};
