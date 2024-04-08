const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Bookstore', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
