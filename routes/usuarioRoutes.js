const express = require('express');
const router = express.Router();
const controller = require('../controllers/usuarioController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');
const { isAdmin } = require('../middlewares/permissions')
const { nivelMinimo } = require('../middlewares/permissions')

router.get('/all', controller.listar);
router.get('/me', auth, controller.me)
router.get('/:id', controller.listarUm);

router.post('/create', controller.criar);
router.post('/login/comum', controller.loginComum);
router.post('/login/cadarca', controller.loginCadArca);
router.post('/login/admin', controller.loginAdm);

router.put('/update', auth, controller.atualizar);
router.put('/update/icon', auth, upload.single("icon"), controller.updateIcon)

router.delete('/delete', auth, controller.deletar);
router.delete('/delete/:id', auth, isAdmin, nivelMinimo(4), controller.deletarOutro)


module.exports = router;