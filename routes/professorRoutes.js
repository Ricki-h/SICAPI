const express = require('express');
const router = express.Router();
const controller = require('../controllers/professorController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadProfIcon');
const { isAdmin, nivelMinimo } = require('../middlewares/permissions');

router.get('/all', controller.listar);
router.get('/:id', controller.listarUm);

router.post('/create', auth, isAdmin, nivelMinimo(1), upload.single("icon"), controller.criar);

router.put('/update/:id', auth, isAdmin, nivelMinimo(1), controller.atualizar);
router.put('/update/icon/:id', auth, isAdmin, nivelMinimo(1), upload.single("icon"), controller.updateIcon)

router.delete('/delete/:id', auth, isAdmin, nivelMinimo(1), controller.deletar);

module.exports = router;