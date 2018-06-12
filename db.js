const knex = require("knex")({
  client: "pg",
  connection: {
    host: process.env.SF_POSTGRES_SERVER,
    user: process.env.SF_POSTGRES_USER,
    password: process.env.SF_POSTGRES_PASS,
    database: "safetransit",
    charset: "utf8",
  },
  migrations: {
    tableName: "migrations",
  },
});

module.exports = knex;
