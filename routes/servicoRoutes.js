const express = require('express');
const router = express.Router();
const controller = require('../controllers/servicoController');
const categController = require('../controllers/categServController');
const agendController = require('../controllers/agendamentoServController')
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadIconCatg');
const { isAdmin, nivelMinimo } = require('../middlewares/permissions');

router.get('/categorias/all', categController.listar);
router.get('/categorias/:id', categController.listarUm);
router.get('/all', controller.listar);
router.get('/agendamentos/meus', auth, agendController.meusServicos);
router.get('/agendamentos/meus/:id', auth, agendController.meuServico);
router.get('/agendamentos/gerencias', auth, isAdmin, nivelMinimo(2), agendController.minhasGerencias);
router.get('/agendamentos/gerencias/:id', auth, isAdmin, nivelMinimo(2), agendController.minhaGerencia);
router.get('/:id', controller.listarUm);

router.post('/categorias/criar', auth, isAdmin, nivelMinimo(3), upload.single("icon"), categController.criar);
router.post('/criar', auth, isAdmin, nivelMinimo(3), controller.create);
router.post('/agendamentos/agendar', auth, agendController.agendar);

router.put('/categorias/edit/:id', auth, isAdmin, nivelMinimo(3), categController.update)
router.put('/categorias/edit/icon/:id', auth, isAdmin, nivelMinimo(3), upload.single("icon"), categController.updateIcon)
router.put('/edit/:id', auth, isAdmin, nivelMinimo(3), controller.update);
router.put('/agendamentos/status/:id', auth, isAdmin, nivelMinimo(2), agendController.atualizarStatus);

router.delete('/categorias/delete/:id', auth, isAdmin, nivelMinimo(4), categController.delete)
router.delete('/delete/:id', auth, isAdmin, nivelMinimo(4), controller.delete);

module.exports = router;