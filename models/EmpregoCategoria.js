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
    }
}, {
    tableName: 'EmpregoCategorias' // Recomendo usar o plural aqui para bater com a FK do outro modelo
});


module.exports = EmpregoCategoria;