const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.get('/all', controller.listar);
router.get('/me', controller.me)
router.get('/:id', controller.listarUm);

router.post('/create', controller.criar);

router.put('/update/:id', controller.atualizar);
// router.put('/update/icon', auth, upload.single("icon"), controller.updateIcon)

router.delete('/delete/:id', controller.deletar);


module.exports = router;