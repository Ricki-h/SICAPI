const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const UsuarioAdm = sequelize.define('UsuárioAdm', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {model: Usuario, key: 'id'}
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    nivel: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = UsuarioAdm;