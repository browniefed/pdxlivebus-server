require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: process.env.SF_POSTGRES_SERVER,
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
      user: process.env.SF_POSTGRES_USER,
      password: process.env.SF_POSTGRES_PASS,
      database: "safetransit",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
    },
  },
};
