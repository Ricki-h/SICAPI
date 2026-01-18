const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const CategoriaServico = sequelize.define('CategoriaServico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    icon: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = CategoriaServico;