const shelljs = require("shelljs");
const run = process.env.NODE_ENV === "production" ? "production" : "development";
shelljs.exec(`node ./node_modules/knex/bin/cli.js migrate:latest --env ${run}`);
