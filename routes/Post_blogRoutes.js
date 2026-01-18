const express = require('express');
const router = express.Router();
const postBlogController = require('../controllers/Post_blogController');

router.get('/', postBlogController.listar);
router.get('/:id', postBlogController.listarUm);
router.post('/create', postBlogController.criar);
router.put('/:id', postBlogController.atualizar);
router.delete('/:id', postBlogController.deletar);

module.exports = router;
