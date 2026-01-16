const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmpregoOportunidade = sequelize.define('EmpregoOportunidade', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Descricao_Curta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Descricao_Detalhada: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Requisitos: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    Rua: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Numero_Local: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    UF_estado: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    Bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Tipoid: { 
        type: DataTypes.INTEGER, 
        allowNull: true,
        references: { model: 'tipoEmpregos', key: 'ID' }
    },
    Salario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
    },
    
    Nome_Empresa: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Carga_Horaria: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Experiencia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    Categoriaid: { 
        type: DataTypes.INTEGER, 
        allowNull: true,
        references: { model: 'EmpregoCategorias', key: 'ID' }
    }


});

module.exports = EmpregoOportunidade;