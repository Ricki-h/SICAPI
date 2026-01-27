const { EmpregoOportunidade, TipoEmprego, EmpregoCategoria } = require('../models/associations');

module.exports = {
    async listar(req, res) {
        const oportunidades = await EmpregoOportunidade.findAll({ include: [
            { model: TipoEmprego },
            { model: EmpregoCategoria }
        ] });
        res.json(oportunidades)
    },
     async listarUm(req, res) {
        const { id } = req.params;
        const oportunidade = await EmpregoOportunidade.findByPk(id, { include: [
            { model: TipoEmprego },
            { model: EmpregoCategoria }
        ] });
        if(!oportunidade) return res.status(404).json({ erro: 'oportunidade não encontrado' });
        res.json(oportunidade);
    },
    async criar(req, res) {
        try {
            const {...dados} = req.body;
            const novaoportunidade = await EmpregoOportunidade.create({
                ...dados, 
                Icone: req.file.path
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
        const oportunidade = await EmpregoOportunidade.findByPk(req.params.id);
        if (!oportunidade) return res.status(404).json({ erro: "oportunidade não encontrado" });

        await oportunidade.destroy();
        res.json({ mensagem: "tipo removido" });
    },
    async atualizar_icon(req, res) {
        const {id} = req.params;
        const icone = req.file.path
        const oportunidade = await EmpregoOportunidade.findByPk(id)
        oportunidade.icone = icone
        await oportunidade.save()
        res.json(oportunidade)
    }

}