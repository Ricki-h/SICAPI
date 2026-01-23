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
        type: DataTypes.STRING(2)
    },
    cidade: {
        type: DataTypes.STRING(100)
    },
    rua: {
        type: DataTypes.STRING(100)
    },
    telefone: {
        type: DataTypes.STRING(15),
        unique: true,
    },
    icon: {
        type: DataTypes.STRING(2000),
        defaultValue: 'https://res.cloudinary.com/dx8qry3lr/image/upload/v1768334682/user-default-icon_vdyyeo.png'
    },
    tipo: {
        type: DataTypes.ENUM('comum', 'cadArca', 'adm'),
        allowNull: false
    }
});

module.exports = Usuario;