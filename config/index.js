const envPath = "./config/env/" + process.env.NODE_ENV + ".env";
require("dotenv").config({ path: envPath });

const mongo = require("./database.config"),
  error = require("./error.config");

module.exports = {
  env: process.env.NODE_ENV,
  mongo,
  error,
};
