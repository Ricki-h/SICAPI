const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const UsuarioComum = sequelize.define('UsuárioComum', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {model: Usuario, key: 'id'}
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    }
});

module.exports = UsuarioComum;