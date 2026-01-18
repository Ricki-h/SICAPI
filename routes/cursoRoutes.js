const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const inscricaoController = require('../controllers/usuarioCursoController')

router.get('/all', controller.listar);
router.get('/meuscursos', auth, inscricaoController.meusCursos);
router.get('/:id/inscritos/', inscricaoController.quantInscritos);
router.get('/:id', controller.listarUm);

router.post('/create', controller.criar);

router.put('/update/:id', controller.atualizar);
// router.put('/update/icon', auth, upload.single("icon"), controller.updateIcon)

router.delete('/delete/:id', controller.deletar);

router.post('/inscrever', auth, inscricaoController.inscrever);

module.exports = router;