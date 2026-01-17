const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const SolicitacaoAuxilio = sequelize.define('SolicitacaoAuxilio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: DataTypes.ENUM('pendente', 'analise', 'deferido', 'indeferido'),
        defaultValue: 'pendente'
    },
    data: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    }
});

module.exports = SolicitacaoAuxilio;