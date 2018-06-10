require("dotenv").config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host     : process.env.POSTGRES_SERVER,
      user     : process.env.POSTGRES_USER,
      password : process.env.POSTGRES_PASS,
      database : 'safetransit',
    },
    migrations: {
      tableName: 'migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
    host     : process.env.POSTGRES_SERVER,
    user     : process.env.POSTGRES_USER,
    password : process.env.POSTGRES_PASS,
    database : 'safetransit',
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'migrations'
    }
  }

};
