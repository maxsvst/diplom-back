const dataBase = require("knex")({
  client: "pg",
  connection: {
    client: "db",
    host: "localhost",
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
