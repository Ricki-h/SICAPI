const express = require('express');
const router = express.Router();
const controller = require('../controllers/auxilioController');
const solController = require('../controllers/solicitarAuxilioController')
const auth = require('../middlewares/auth');
const { isAdmin } = require('../middlewares/permissions');
const { nivelMinimo } = require('../middlewares/permissions');

router.get('/all', controller.listar);
router.get('/:id', controller.listarUm);
router.get('/solicitacoes/meus',auth, solController.meusAuxilios);
router.get('/solicitacoes/gerencias', auth, isAdmin, nivelMinimo(2), solController.minhasGerencias);
router.get('/solicitacoes/:id', auth, solController.meuAuxilio);

router.post('/criar', auth, isAdmin, nivelMinimo(3), controller.criar);
router.post('/solicitar', auth, solController.solicitarAuxilio)

router.put('/update/:id', auth, isAdmin, nivelMinimo(2), controller.editar);
router.put('/status/:id', auth, isAdmin, nivelMinimo(2), solController.atualizarStatus)

router.delete('/delete/:id', auth, isAdmin, nivelMinimo(3), controller.delete);

module.exports = router;