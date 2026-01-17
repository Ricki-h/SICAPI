const express = require('express');
const router = express.Router();
const inscricaoController = require('../controllers/EmpregoInscricaoController');

router.get('/', inscricaoController.listar);          // GET /inscricao
router.get('/:id', inscricaoController.listarUm);      // GET /inscricao/1
router.post('/inscrever', inscricaoController.criar); // POST /inscricao/inscrever
router.put('/:id', inscricaoController.atualizar);        // PUT /inscricao/1
router.delete('/:id', inscricaoController.deletar);       // DELETE /inscricao/1

module.exports = router;
