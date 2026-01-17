const express = require('express');
const app = express();
const sequelize = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/ongs', require('./routes/ongRoutes'));
app.use('/abrigos', require('./routes/abrigoRoutes'));

require('./models/associations');

sequelize.sync();

module.exports = app;