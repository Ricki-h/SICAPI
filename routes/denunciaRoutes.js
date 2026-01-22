const express = require('express');
const router = express.Router();
const controller = require('../controllers/denunciaController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadDenuncias');

const { isAdmin, nivelMinimo } = require('../middlewares/permissions')

router.get('/all', controller.listar);
router.get('/minhas', auth, controller.minhasDenuncias);
router.get('/gerenciadas', auth, isAdmin, controller.denunciasGerenciadas);
router.get('/:id', controller.listarUm);

router.post('/create', auth, upload.array("fotos", 3), controller.criar);

router.put('/update/:id', auth, isAdmin, nivelMinimo(2), controller.atualizar);

router.delete('/delete/:id', auth, isAdmin, nivelMinimo(3), controller.deletar);

module.exports = router;