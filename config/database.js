const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    dialectModule: require('better-sqlite3'),
    storage: process.env.DB_FILE,
    logging: false
});

module.exports = sequelize;