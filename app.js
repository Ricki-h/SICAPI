const express = require('express');
const app = express();
const sequelize = require('./config/database');


const Usuario = require('./models/Usuario');
const TipoEmprego = require('./models/tipoEmprego')

const EmpregoCategoria = require('./models/EmpregoCategoria'); 

const EmpregoInscricao = require('./models/EmpregoInscricao');


const EmpregoOportunidade = require('./models/')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use('/usuarios', require('./routes/usuarioRoutes'));

app.use('/tipoemprego', require('./routes/tipoempregoRoutes'));

app.use('/empregocategoria', require('./routes/EmpreegoCategoria'));

app.use('/empregooportunidade', require('./routes/EmpregoOportunidadeRoutes'));

app.use('/inscricao', require('./routes/EmpregoInscricaoRoutes'))




module.exports = app;
