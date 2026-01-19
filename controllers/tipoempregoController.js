const TipoEmprego = require('../models/tipoEmprego');

module.exports = {
    async listar(req, res) {
        const tipos = await TipoEmprego.findAll();
        res.json(tipos)
    },
     async listarUm(req, res) {
        const { id } = req.params;
        const tipo = await TipoEmprego.findByPk(id);
        if(!tipo) return res.status(404).json({ erro: 'Tipo não encontrado' });
        res.json(tipo);
    },
    async criar(req, res) {
        try {
            const {...dados} = req.body;
            const novoTipo = await TipoEmprego.create({
                ...dados,
                Icone: req.file.path
            });
            res.json(novoTipo);
        } catch(error) {
            res.status(400).json({erro: error.message});

        }
    },
    async atualizar(req, res) {
        try {
            const tipo = await TipoEmprego.findByPk(req.params.id);
            if(!tipo) return res.status(404).json({ erro: 'tipo não encontrado' });

            await curso.update(req.body);
            res.json(tipo);

        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const tipo = await TipoEmprego.findByPk(req.params.id);
        if (!tipo) return res.status(404).json({ erro: "tipo não encontrado" });

        await curso.destroy();
        res.json({ mensagem: "tipo removido" });
    },
    async atualizar_icon(req, res) {
        const {id} = req.params;
        const icone = req.file.path
        const tipo = await EmpregoOportunidade.findByPk(id)
        tipo.icone = icone
        await oportunidade.save()
        res.json(tipo)
    }

}