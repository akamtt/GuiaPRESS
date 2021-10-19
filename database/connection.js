const Sequelize = require('sequelize');
const connection = new Sequelize('guiapress', 'root', '08162200', {
  host: 'localhost',
  dialect: 'mysql',
});
module.exports = connection;
