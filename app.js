const express = require('express');
const app = express();
const sequelize = require('./config/database');
const multer = require('multer');

require('./models/associations');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ erro: err.message || "Erro no upload" });
  }
  if (err) {
    return res.status(400).json({ erro: err.message });
  }
  next();
});
app.use('/usuarios', require('./routes/usuarioRoutes'));

app.use('/auxilios', require('./routes/auxilioRoutes'));

app.use('/servicos', require('./routes/servicoRoutes'));

app.use('/denuncias', require('./routes/denunciaRoutes'));

app.use('/ongs', require('./routes/ongRoutes'));
app.use('/abrigos', require('./routes/abrigoRoutes'));

app.use('/cursos', require('./routes/cursoRoutes'));
app.use('/professores', require('./routes/professorRoutes'));

app.use('/tipoemprego', require('./routes/tipoempregoRoutes'));
app.use('/empregocategoria', require('./routes/EmpreegoCategoria'));
app.use('/empregooportunidade', require('./routes/EmpregoOportunidadeRoutes'));
app.use('/inscricao', require('./routes/EmpregoInscricaoRoutes'))

app.use('/blog', require('./routes/Post_blogRoutes'))

sequelize.sync();

module.exports = app;