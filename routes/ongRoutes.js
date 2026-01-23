const express = require('express');
const router = express.Router();
const controller = require('../controllers/ongController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { isAdmin, nivelMinimo } = require('../middlewares/permissions');

router.get('/all', controller.listar);
router.get('/:id', controller.listarUm);

router.post('/create', auth, isAdmin, nivelMinimo(1), controller.criar);

router.put('/update/:id', auth, isAdmin, nivelMinimo(1), controller.atualizar);

router.delete('/delete/:id', auth, isAdmin, nivelMinimo(1), controller.deletar);

module.exports = router;