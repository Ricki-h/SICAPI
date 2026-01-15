const { DataTypes } = require('sequelize');
const sequelize = require('../config/database')

const Usuario = sequelize.define('Usuario', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(100),
        unique: true
    },
    senha: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    data_nasc: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
     uf_estado: {
        type: DataTypes.STRING(2),
        allowNull: false,
    },
    cidade: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    rua: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    telefone: {
        type: DataTypes.STRING(15),
        unique: true,
    },
    icon: {
        type: DataTypes.STRING(2000),
        defaultValue: 'https://res.cloudinary.com/dx8qry3lr/image/upload/v1768334682/user-default-icon_vdyyeo.png'
    }
});

module.exports = Usuario;