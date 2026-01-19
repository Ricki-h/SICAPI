const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const EmpregoCategoria = sequelize.define('EmpregoCategoria', {
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
}, {
    tableName: 'EmpregoCategorias'
});


module.exports = EmpregoCategoria;