const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middlewares/permissions')
const auth = require('../middlewares/auth');
const postBlogController = require('../controllers/Post_blogController');

router.get('/', postBlogController.listar);
router.get('/:id', postBlogController.listarUm);
router.post('/create', auth, isAdmin, postBlogController.criar);
router.put('/:id', auth, isAdmin,  postBlogController.atualizar);
router.delete('/:id', auth, isAdmin,  postBlogController.deletar);

module.exports = router;
