const express = require('express');
const router = express.Router();
const controller = require('../controllers/ongController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/all', controller.listar);
router.get('/me', controller.me)
router.get('/:id', controller.listarUm);

// router.post('/create', controller.criar);

// NÂO TEMOS AS ROTAS ABAIXO
// router.post('/login', controller.login);
// router.put('/update', auth, controller.atualizar);
// router.put('/update/icon', auth, upload.single("icon"), controller.updateIcon)

router.delete('/delete', auth, controller.deletar);

module.exports = router;