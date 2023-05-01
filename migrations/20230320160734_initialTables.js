exports.up = async function (knex) {
  await knex.schema.createTable("Teacher", function (table) {
    table.increments("id").primary();
    table.string("fullName").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
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
    table.string("fullName").unique().notNullable();
    table.string("shortName").unique().notNullable();
    table.string("code").notNullable();
    table.string("cathedra").notNullable();
    table.string("studyField").notNullable();
  });

  await knex.schema.createTable("Discipline_Teacher", function (table) {
    table.integer("teacherId").notNullable();
    table.integer("disciplineId").notNullable();

    table
      .foreign("teacherId")
      .references("id")
      .inTable("Teacher")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("ExamQuestions", function (table) {
    table.increments("id").primary();
    table.integer("disciplineId").notNullable();
    table.string("question").notNullable();

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Lections", function (table) {
    table.increments("id").primary();
    table.integer("disciplineId").notNullable();
    table.string("lectionName").notNullable();

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd", function (table) {
    table.increments("id").primary();
    table.integer("disciplineId").notNullable();
    table.integer("rpdSemester").notNullable();
    table.integer("rpdTotalHours").notNullable();
    table.integer("rpdLectionHours").notNullable();
    table.integer("rpdPracticalHours").notNullable();
    table.integer("rpdLaboratoryHours").notNullable();
    table.integer("rpdSelfstudyHours").notNullable();
    table.integer("rpdAdditionalHours").notNullable();
    table.integer("coursework").notNullable();
    table.integer("test").notNullable();
    table.integer("exam").notNullable();
    table.integer("year").notNullable();

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_Lections", function (table) {
    table.integer("rpdId").notNullable();
    table.integer("lectionId").notNullable();
    table.integer("lectionHours").notNullable();

    table
      .foreign("rpdId")
      .references("id")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("lectionId")
      .references("id")
      .inTable("Lections")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("PracticalClass", function (table) {
    table.increments("practicalClassId").primary();
    table.integer("disciplineId").notNullable();
    table.string("practicalClassName").notNullable();

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_PracticalClass", function (table) {
    table.integer("rpdId").notNullable();
    table.integer("practicalClassId").notNullable();
    table.integer("practicalHours").notNullable();

    table
      .foreign("rpdId")
      .references("id")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("practicalClassId")
      .references("practicalClassId")
      .inTable("PracticalClass")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("LaboratoryClass", function (table) {
    table.increments("laboratoryClassId").primary();
    table.integer("disciplineId").notNullable();
    table.string("laboratoryClassName").notNullable();

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_LaboratoryClass", function (table) {
    table.integer("rpdId").notNullable();
    table.integer("laboratoryClassId").notNullable();
    table.integer("laboratoryHours").notNullable();

    table
      .foreign("rpdId")
      .references("id")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("laboratoryClassId")
      .references("laboratoryClassId")
      .inTable("LaboratoryClass")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Topic", function (table) {
    table.increments("id").primary();
    table.integer("disciplineId").notNullable();
    table.string("topicName").notNullable();

    table
      .foreign("disciplineId")
      .references("id")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_Topic", function (table) {
    table.integer("rpdId").notNullable();
    table.integer("topicId").notNullable();
    table.integer("topicSemester").notNullable();
    table.integer("topicTotalHours").notNullable();
    table.integer("topicLectionHours").notNullable();
    table.integer("topicPracticalHours").notNullable();
    table.integer("topicLaboratoryHours").notNullable();
    table.integer("topicSelfstudyHours").notNullable();

    table
      .foreign("rpdId")
      .references("id")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("topicId")
      .references("id")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
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
    table.integer("rpdId").notNullable();
    table.integer("competenceId").notNullable();

    table
      .foreign("rpdId")
      .references("id")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("competenceId")
      .references("id")
      .inTable("Competence")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
};

exports.down = function (knex) {};
