const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.SF_POSTGRES_SERVER,
      port: "5432",
      user: process.env.SF_POSTGRES_USER,
      password: process.env.SF_POSTGRES_PASS,
      database: "safetransit",
    },
    migrations: {
      tableName: "migrations",
    },
  },

  production: {
    client: "pg",
    connection: {
      host: process.env.SF_POSTGRES_SERVER,
      port: "5432",
      user: process.env.SF_POSTGRES_USER,
      password: process.env.SF_POSTGRES_PASS,
      database: "safetransit",
    },
    migrations: {
      tableName: "migrations",
    },
  },
};
