const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Ong = sequelize.define('Ong', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    recursos: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
    }
);

module.exports = Ong;