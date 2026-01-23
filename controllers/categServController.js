const { CategoriaServico } = require('../models/associations');

module.exports = {
    async criar(req, res) {
        try {
            const { nome } = req.body;
            const categoriaIcon = req.file.path;
    
            const novaCategoria = await CategoriaServico.create({
                nome,
                icon: categoriaIcon
            })
    
            res.json(novaCategoria)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async listar(req, res) {
        try {
            const categorias = await CategoriaServico.findAll();

            res.json(categorias)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaServico.findByPk(id);
            if(!categoria) return res.status(500).json({ mensagem: 'Categoria de Serviço não encontrada' });

            res.json(categoria);
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaServico.findByPk(id);
            if(!categoria) return res.status(500).json({ mensagem: 'Categoria de Serviço não encontrada' });

            let dados = req.body;
            categoria.update(dados);

            res.json(categoria);
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async updateIcon(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaServico.findByPk(id);
            if(!categoria) return res.status(500).json({ mensagem: 'Categoria de Serviço não encontrada' });

            categoria.icon = req.file.path;
            await categoria.save()
            res.json({ mensagem: 'icon atualizado', icon: categoria.icon})
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const categoria = await CategoriaServico.findByPk(id);
            if(!categoria) return res.status(500).json({ mensagem: 'Categoria de Serviço não encontrada' });

            categoria.destroy();
            res.json({ mensagem: 'Categoria excluida' });
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}