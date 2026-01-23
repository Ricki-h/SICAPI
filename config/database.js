const { Sequelize } = require('sequelize');
const betterSqlite3 = require('better-sqlite3');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: betterSqlite3,
    storage: process.env.DB_FILE || 'database.sqlite',
    logging: false,
});

module.exports = sequelize;