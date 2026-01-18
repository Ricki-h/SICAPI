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
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: UsuarioAdm , key: 'id' } 
    },
    Imagens: {
        type: DataTypes.STRING, 
        allowNull: true
    },
    Descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    Tag: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Posts_blog'
});

module.exports = PostBlog;
