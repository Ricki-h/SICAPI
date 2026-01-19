const express = require('express');
const router = express.Router();
const controller = require('../controllers/EmpregoCategoriaController');
const auth = require('../middlewares/auth');
const upload = require('../middlewares/uploadCategoria');
const { isAdmin, nivelMinimo } = require('../middlewares/permissions');

router.get('/all', controller.listar);

router.get('/:id', controller.listarUm);

router.post('/create', auth, isAdmin, nivelMinimo(2), controller.criar);

router.put('/update/:id', auth, isAdmin, nivelMinimo(2), controller.atualizar);
 

router.delete('/delete/:id', auth, isAdmin, nivelMinimo(2), controller.deletar);

router.put('/update/icon/:id', auth, isAdmin, nivelMinimo(2), upload.single('icone'), controller.atualizar_icon );


module.exports = router;