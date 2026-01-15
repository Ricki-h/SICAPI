const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Professor = sequelize.define('Professor', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    profissao: {
        type: DataTypes.STRING(70),
        allowNull: false
    }, 
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    }

    // icon: {...}

    }
);

module.exports = Professor;