const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Servico = sequelize.define('Servico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desabrigado: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    etapas: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    publico: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descrição: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    descricaoCurta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    infoExtra: {
        type: DataTypes.TEXT
    }
});

module.exports = Servico;