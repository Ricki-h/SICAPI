const { DataTypes, DATE } = require('sequelize');
const sequelize = require('../config/database');

const AgendamentoServico = sequelize.define('AgendamentoServico', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    data: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('pendente', 'analise', 'em_processo', 'negado', 'concluido'),
        defaultValue: 'pendente'
    }
})

module.exports = AgendamentoServico