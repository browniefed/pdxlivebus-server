const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.POSTGRES_SERVER,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASS,
    database: "safetransit",
  },
  migrations: {
    tableName: "migrations",
  },
});

module.exports = knex;
