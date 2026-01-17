const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Denuncia = sequelize.define('Denuncia', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    data: {
        type: DataTypes.DATEONLY
    },
    local: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    status: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    // fotos: {...}
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    admin_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

module.exports = Denuncia;