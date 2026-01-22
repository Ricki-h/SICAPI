const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');
const auth = require('../middlewares/auth');
const { uploadMutiple } = require('../middlewares/uploadCurso');
const inscricaoController = require('../controllers/usuarioCursoController');
const { isAdmin, nivelMinimo } = require('../middlewares/permissions');

router.get('/all', controller.listar);
router.get('/meuscursos', auth, inscricaoController.meusCursos);
router.get('/:id/inscritos/', inscricaoController.quantInscritos);
router.get('/:id', controller.listarUm);

router.post('/create', auth, isAdmin, nivelMinimo(1), uploadMutiple, controller.criar);

router.put('/update/:id', auth, isAdmin, nivelMinimo(1), controller.atualizar);
router.put('/update/files/:id', auth, isAdmin, nivelMinimo(1), uploadMutiple, controller.updateFiles)

router.delete('/delete/:id', auth, isAdmin, nivelMinimo(1), controller.deletar);

router.post('/inscrever', auth, inscricaoController.inscrever);

module.exports = router;