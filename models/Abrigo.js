const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Abrigo = sequelize.define('Abrigo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    quant_pessoas: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    ongId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Abrigo;