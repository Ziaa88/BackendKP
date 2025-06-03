require('dotenv').config();
const { Sequelize } = require('sequelize');
require('pg'); // tambahkan require pg secara manual

const { DB_CONNECTION_METHOD, DB_URL, DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_DIALECT } = process.env;

if (DB_CONNECTION_METHOD === 'URL') {
  module.exports = new Sequelize(DB_URL, {
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  module.exports = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
  });
}