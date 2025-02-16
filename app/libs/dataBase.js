const dataBase = require("knex")({
  client: "pg",
  connection: {
    client: "db",
    host: process.env.DB_HOST,
    user: "postgres",
    password: "root",
    database: "rpd",
  },
  searchPath: ["public"],
  migrations: {
    tableName: "migrations",
  },
});

module.exports = { dataBase };
