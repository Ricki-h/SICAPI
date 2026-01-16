const express = require('express');
const app = express();
const sequelize = require('./config/database');

// IMPORTANTE: Importe o modelo Usuario aqui para o Sequelize saber que ele existe
const Usuario = require('./models/Usuario'); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... seu código de erro do multer ...

app.use('/usuarios', require('./routes/usuarioRoutes'));



module.exports = app;
