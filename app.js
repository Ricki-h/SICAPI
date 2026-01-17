const express = require('express');
const app = express();
const sequelize = require('./config/database');
const multer = require('multer');

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

app.use('/cursos', require('./routes/cursoRoutes'));
app.use('/professores', require('./routes/professorRoutes'));
app.use('/usuarios', require('./routes/usuarioRoutes'));

require('./models/associations');

sequelize.sync();

module.exports = app;