const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const InscricaoEmprego = sequelize.define('InscricaoEmprego', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ID_Usuario: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    ID_OportEmprego: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'Inscricoes_Emprego'
});

module.exports = InscricaoEmprego;
