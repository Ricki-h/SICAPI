const { json } = require('sequelize');
const Auxilio = require('../models/Auxilio');

module.exports = {
    async listar(req, res) {
        try {
            const auxilios = await Auxilio.findAll();
            res.json(auxilios);
        }
        catch(error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const auxilio = await Auxilio.findByPk(id);
            if(!auxilio) {
                return res.status(404).json({ erro: 'Auxilio não encontrado' })
            }
            res.json(auxilio);
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async criar(req, res) {
        try {
            const dados = req.body

            const novoAuxilio = await Auxilio.create(dados);
            res.json(novoAuxilio);
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async editar(req, res) {
        try {
            const { id } = req.params;
            const auxilio = await Auxilio.findByPk(id);
            if(!auxilio) {
                return res.status(404).json({ erro: 'Auxilio não encontrado' })
            };

            let dados = req.body;
            auxilio.update(dados)
            res.json(auxilio)
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const auxilio = await Auxilio.findByPk(id);
            if(!auxilio) {
                return res.status(404).json({ erro: 'Auxilio não encontrado' })
            };
    
            await auxilio.destroy();
            res.json({ mensagem: 'Auxilio removido' });
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    }
}