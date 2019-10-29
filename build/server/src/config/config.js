"use strict";

require('dotenv').config();

module.exports = {
  "development": {
    "database": "rmpos",
    "username": "api_user",
    "password": "password",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "database": "rmpos",
    "username": "api_user",
    "password": "password",
    "host": "localhost",
    "dialect": "postgres"
  },
  "production": {
    "database": process.env.DB_NAME,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "host": process.env.DB_HOST,
    "dialect": "postgres"
  }
};
//# sourceMappingURL=config.js.map