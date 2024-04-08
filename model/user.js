const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 3  // Default role is User
    }
});

module.exports = User;
