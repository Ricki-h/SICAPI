const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const UsuarioAdm = require('./UsuarioAdm')


const PostBlog = sequelize.define('PostBlog', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Data: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    ID_Admin: {
        type: DataTypes.INTEGER

        
    },
    Titulo: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Imagens: {
        type: DataTypes.STRING, 
        allowNull: true,
        
    },
    Descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Tag: {
        type: DataTypes.STRING,
        defaultValue: "post",
        allowNull: true
    }
}, {
    tableName: 'Posts_blog'
});

module.exports = PostBlog;
