const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const TipoEmprego = sequelize.define('TipoEmprego', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Icone: {
        type: DataTypes.STRING(2000),
        allowNull: false
    }
    

});

module.exports = TipoEmprego;
