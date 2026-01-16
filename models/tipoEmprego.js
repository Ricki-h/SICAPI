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
    }
    // Icone: {
        //type: DataTypes.STRING,
        // allowNull: true
    //}
    }
    // tableName: 'TipoEmpregos',
    // timestamps: false

);

module.exports = TipoEmprego;