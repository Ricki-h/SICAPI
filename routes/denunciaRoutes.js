const express = require('express');
const router = express.Router();
const controller = require('../controllers/denunciaController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

const { isAdmin } = require('../middlewares/permissions')

router.get('/all', controller.listar);
router.get('/minhas', auth, controller.minhasDenuncias);
router.get('/gerenciadas', auth, isAdmin, controller.denunciasGerenciadas);
router.get('/:id', controller.listarUm);

router.post('/create', auth, controller.criar);

router.put('/update/:id', auth, controller.atualizar);

router.delete('/delete/:id', auth, controller.deletar);

module.exports = router;