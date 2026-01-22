const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UsuarioCurso = sequelize.define('UsuarioCurso', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    }
})

module.exports = UsuarioCurso;