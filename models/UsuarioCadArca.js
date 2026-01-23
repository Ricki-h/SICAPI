const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const UsuarioCadArca = sequelize.define('UsuárioCadArca', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {model: Usuario, key: 'id'}
    },
    cadarca: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    }
});

module.exports = UsuarioCadArca;