const { Servico, CategoriaServico } = require('../models/associations')

module.exports = {
    async create(req, res) {
        try {
            const {categoria, ...dados} = req.body;

            const novoServico = await Servico.create({
                ...dados,
                categoria: categoria
            });
            res.json(novoServico);
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async listar(req, res) {
        try {
            const servicos = await Servico.findAll({ include: [{ model: CategoriaServico }] });

            res.json(servicos)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async listarUm(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servico.findByPk(id, { include: [{ model: CategoriaServico }] });
            if(!servico) return res.status(500).json({ erro: 'Serviço não encontrado' });

            res.json(servico)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async update(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servico.findByPk(id, { include: [{ model: CategoriaServico }] });
            if(!servico) return res.status(500).json({ erro: 'Serviço não encontrado' });

            let dados = req.body;
            servico.update(dados);

            res.json(servico)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;

            const servico = await Servico.findByPk(id, { include: [{ model: CategoriaServico }] });
            if(!servico) return res.status(500).json({ erro: 'Serviço não encontrado' });

            servico.destroy()

            res.json({ mensagem: 'Serviço removido' })
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    }
};