const EmpregoOportunidade = require('../models/EmpregoOportunidade');

module.exports = {
    async listar(req, res) {
        const oportunidades = await EmpregoOportunidade.findAll();
        res.json(oportunidades)
    },
     async listarUm(req, res) {
        const { id } = req.params;
        const oportunidade = await EmpregoOportunidade.findByPk(id);
        if(!oportunidade) return res.status(404).json({ erro: 'oportunidade não encontrado' });
        res.json(oportunidade);
    },
    async criar(req, res) {
        try {
            const {...dados} = req.body;
            const novaoportunidade = await EmpregoOportunidade.create({
                ...dados
            });
            res.json(novaoportunidade);
        } catch(error) {
            res.status(400).json({erro: error.message});

        }
    },
    async atualizar(req, res) {
        try {
            const oportunidade = await EmpregoOportunidade.findByPk(req.params.id);
            if(!oportunidade) return res.status(404).json({ erro: 'oportunidade não encontrado' });

            await curso.update(req.body);
            res.json(oportunidade);

        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const tipo = await EmpregoOportunidade.findByPk(req.params.id);
        if (!tipo) return res.status(404).json({ erro: "tipo não encontrado" });

        await curso.destroy();
        res.json({ mensagem: "tipo removido" });
    }

}