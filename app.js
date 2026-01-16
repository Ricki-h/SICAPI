const express = require('express');
const app = express();
const sequelize = require('./config/database');

// IMPORTANTE: Importe o modelo Usuario aqui para o Sequelize saber que ele existe
const Usuario = require('./models/Usuario');
const TipoEmprego = require('./models/tipoEmprego')

const EmpregoCategoria = require('./models/EmpregoCategoria'); // Ajuste o caminho se necessário

const EmpregoOportunidade = require('./models/')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... seu código de erro do multer ...

app.use('/usuarios', require('./routes/usuarioRoutes'));

app.use('/tipoemprego', require('./routes/tipoempregoRoutes'));

app.use('/empregocategoria', require('./routes/EmpreegoCategoria'));

app.use('/empregooportunidade', require('./routes/EmpregoOportunidadeRoutes'));

sequelize.sync({ force: false }) // 'force: false' não apaga os dados existentes
  .then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
  })
  .catch((err) => {
    console.error('Erro ao sincronizar tabelas:', err);
  });

module.exports = app;
