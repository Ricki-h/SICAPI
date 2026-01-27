const { EmpregoCategoria } = require('../models/associations');

module.exports = {
    async listar(req, res) {
        const categorias = await EmpregoCategoria.findAll();
        res.json(categorias)
    },
     async listarUm(req, res) {
        const { id } = req.params;
        const categoria = await EmpregoCategoria.findByPk(id);
        if(!categoria) return res.status(404).json({ erro: 'categoria não encontrado' });
        res.json(categoria);
    },
    async criar(req, res) {
        try {
            const {...dados} = req.body;
            const novacategoria = await EmpregoCategoria.create({
                ...dados
            });
            res.json(novacategoria);
        } catch(error) {
            res.status(400).json({erro: error.message});

        }
    },
    async atualizar(req, res) {
        try {
            const categoria = await EmpregoCategoria.findByPk(req.params.id);
            if(!categoria) return res.status(404).json({ erro: 'categoria não encontrado' });

            await categoria.update(req.body);
            res.json(categoria);

        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const categoria = await EmpregoCategoria.findByPk(req.params.id);
        if (!categoria) return res.status(404).json({ erro: "categoria não encontrado" });

        await categoria.destroy();
        res.json({ mensagem: "categoria removida" });
    },
    async atualizar_icon(req, res) {
        const {id} = req.params;
        const icone = req.file.path
        const categoria = await EmpregoOportunidade.findByPk(id)
        categoria.icone = icone
        await oportunidade.save()
        res.json(categoria)
    }


}