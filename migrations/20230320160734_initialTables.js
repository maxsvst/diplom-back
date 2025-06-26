exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable("Teacher", function (table) {
    table.uuid('teacherId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string("fullName").unique().notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.enu("rank", [
      "Ассистент",
      "Преподаватель",
      "Старший преподаватель",
      "Доцент",
      "Профессор",
    ]).notNullable();
    table.string("position").notNullable();
    table.enu("credentials", [
      "ROLE_ADMIN",
      "ROLE_USER",
    ]).defaultTo("ROLE_USER")
    table.string("refreshToken");
  });

  await knex.schema.createTable("Discipline", function (table) {
    table.uuid('disciplineId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string("fullName").unique().notNullable();
    table.string("code").notNullable();
    table.string("profileName").notNullable();
    table.string("studyField").notNullable();
    table.string("studyFieldCode").notNullable();
  });

  await knex.schema.createTable("Purpose", function (table) {
    table.uuid('purposeId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("disciplineId").notNullable();
    table.string("purposeName").notNullable();

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Objective", function (table) {
    table.uuid('objectiveId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("disciplineId").notNullable();
    table.string("objectiveName").notNullable();

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Topic", function (table) {
    table.uuid('topicId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("disciplineId").notNullable();
    table.string("topicName").notNullable();

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Discipline_Teacher", function (table) {
    table.uuid("teacherId").notNullable();
    table.uuid("disciplineId").notNullable();

    table
      .foreign("teacherId")
      .references("teacherId")
      .inTable("Teacher")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['teacherId', 'disciplineId']);
  });

  await knex.schema.createTable("ExamQuestion", function (table) {
    table.uuid('examQuestionId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("disciplineId").notNullable();
    table.uuid("topicId").notNullable();
    table.string("examQuestionName").notNullable();

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("topicId")
      .references("topicId")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("TopicConcept", function (table) {
    table.uuid('topicConceptId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("topicId").notNullable();
    table.string("topicConceptName").notNullable();

    table
      .foreign("topicId")
      .references("topicId")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Lection", function (table) {
    table.uuid('lectionId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("topicId").notNullable();
    table.string("lectionName").notNullable();

    table
      .foreign("topicId")
      .references("topicId")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd", function (table) {
    table.uuid('rpdId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("disciplineId").notNullable();
    table.integer("rpdTotalHours").notNullable();
    table.integer("rpdLectionHours").notNullable();
    table.integer("rpdPracticalHours").notNullable();
    table.integer("rpdLaboratoryHours").notNullable();
    table.integer("rpdSelfstudyHours").notNullable();
    table.integer("rpdAdditionalHours").notNullable();
    table.integer("controlWeek").notNullable();
    table.date("rpdDate").notNullable();
    table.integer("course").notNullable();
    table.integer("semester").notNullable();
    table.integer("creditUnits").notNullable();
    table.boolean("сontrolWork").notNullable();
    table.boolean("courseProject").notNullable();
    table.boolean("credit").notNullable();
    table.boolean("exam").notNullable();

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_Lection", function (table) {
    table.uuid("rpdId").notNullable();
    table.uuid("lectionId").notNullable();
    table.integer("lectionHours").notNullable();

    table
      .foreign("rpdId")
      .references("rpdId")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("lectionId")
      .references("lectionId")
      .inTable("Lection")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['rpdId', 'lectionId']);
  });

  await knex.schema.createTable("PracticalClass", function (table) {
    table.uuid('practicalClassId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("topicId").notNullable();
    table.string("practicalClassName").notNullable();

    table
      .foreign("topicId")
      .references("topicId")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_PracticalClass", function (table) {
    table.uuid("rpdId").notNullable();
    table.uuid("practicalClassId").notNullable();
    table.integer("practicalHours").notNullable();

    table
      .foreign("rpdId")
      .references("rpdId")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("practicalClassId")
      .references("practicalClassId")
      .inTable("PracticalClass")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['rpdId', 'practicalClassId']);
  });

  await knex.schema.createTable("LaboratoryClass", function (table) {
    table.uuid('laboratoryClassId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid("topicId").notNullable();
    table.string("laboratoryClassName").notNullable();

    table
      .foreign("topicId")
      .references("topicId")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("Rpd_LaboratoryClass", function (table) {
    table.uuid("rpdId").notNullable();
    table.uuid("laboratoryClassId").notNullable();
    table.integer("laboratoryHours").notNullable();

    table
      .foreign("rpdId")
      .references("rpdId")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("laboratoryClassId")
      .references("laboratoryClassId")
      .inTable("LaboratoryClass")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['rpdId', 'laboratoryClassId']);
  });

  await knex.schema.createTable("Rpd_Topic", function (table) {
    table.uuid("rpdId").notNullable();
    table.uuid("topicId").notNullable();
    table.integer("topicTotalHours").notNullable();
    table.integer("topicLectionHours").notNullable();
    table.integer("topicPracticalHours").notNullable();
    table.integer("topicLaboratoryHours").notNullable();
    table.integer("topicSelfstudyHours").notNullable();

    table
      .foreign("rpdId")
      .references("rpdId")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("topicId")
      .references("topicId")
      .inTable("Topic")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['rpdId', 'topicId']);
  });

  await knex.schema.createTable("Competence", function (table) {
    table.uuid('competenceId').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string("competenceType").notNullable();
    table.string("competenceCode").notNullable();
    table.string("competenceName").notNullable();
    table.string("indicatorCode").notNullable();
    table.string("indicatorName").notNullable();
  });

  await knex.schema.createTable("Discipline_Competence", function (table) {
    table.uuid("competenceId").notNullable();
    table.uuid("disciplineId").notNullable();

    table
      .foreign("competenceId")
      .references("competenceId")
      .inTable("Competence")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("disciplineId")
      .references("disciplineId")
      .inTable("Discipline")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['competenceId', 'disciplineId']);
  });

  await knex.schema.createTable("Rpd_Competence", function (table) {
    table.uuid("rpdId").notNullable();
    table.uuid("competenceId").notNullable();

    table
      .foreign("rpdId")
      .references("rpdId")
      .inTable("Rpd")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table
      .foreign("competenceId")
      .references("competenceId")
      .inTable("Competence")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    table.primary(['competenceId', 'rpdId']);
  });
};

exports.down = function (knex) { };
