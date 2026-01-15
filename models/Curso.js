const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Curso = sequelize.define('Curso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    subtitulo: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    desenvolvedor: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    requisitos: {
        type: DataTypes.STRING
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    carga_horaria: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    duracao: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    modalidade: {
        type: DataTypes.STRING(50)
    },
    area: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
    
    // REFERENCIAR CHAVE ESTRANGEIRA Professor AQUI

    // foto: {...},
    // icon: {...}
    }
);

module.exports = Curso;