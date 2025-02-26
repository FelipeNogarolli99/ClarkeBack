const { DataTypes } = require('sequelize');
const sequelize = require('../db/conn');

const User = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Evita e-mails duplicados
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'User',
    timestamps: false,
});

module.exports = User;
