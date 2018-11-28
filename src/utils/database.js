
const Sequelize = require('sequelize');

const { DB_PASS, DB_USER } = process.env;
const sequelize = new Sequelize('boxdrive', DB_USER, DB_PASS, {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
