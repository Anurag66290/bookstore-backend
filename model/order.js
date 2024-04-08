const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../Database');

const Order = sequelize.define('Order', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending'
    }
});

module.exports = Order;
