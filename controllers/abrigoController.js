const Abrigo = require('../models/Abrigo');

module.exports = {
    async listar(req, res) {
        const abrigos = await Abrigo.findAll();
        res.json(abrigos);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const abrigo = await Abrigo.findByPk(id);
        if (!abrigo) return res.status(404).json({ erro: 'Abrigo não encontrado' });
        res.json(abrigo);
    },
    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novoAbrigo = await Abrigo.create({
                ...dados
            });
            res.json(novoAbrigo);
        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const abrigo = await Abrigo.findByPk(req.params.id); 
            if(!abrigo) return res.status(404).json({ erro: 'Abrigo não encontrado' });
            await abrigo.update(req.body);
            res.json(abrigo);
        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const abrigo = await Abrigo.findByPk(req.params.id);
        if (!abrigo) return res.status(404).json({ erro: "Abrigo não encontrado" });
        await abrigo.destroy();
        res.json({ mensagem: "Abrigo removido" });
    }
};