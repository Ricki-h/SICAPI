const { InscricaoEmprego, Usuario, EmpregoOportunidade } = require('../models/a');

module.exports = {

    async listar(req, res) {
        try {
            const inscricoes = await InscricaoEmprego.findAll({
                include: [
                    { model: Usuario, attributes: ['ID', 'Nome'] },
                    { model: EmpregoOportunidade, attributes: ['ID', 'Titulo', 'Nome_Empresa'] }
                ]
            });
            res.json(inscricoes);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const inscricao = await InscricaoEmprego.findByPk(id, {
                include: [Usuario, EmpregoOportunidade]
            });
            if (!inscricao) return res.status(404).json({ erro: 'Inscrição não encontrada' });
            res.json(inscricao);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novaInscricao = await InscricaoEmprego.create({
                ...dados
            });
            res.json(novaInscricao);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const inscricao = await InscricaoEmprego.findByPk(id);
            if (!inscricao) return res.status(404).json({ erro: 'Inscrição não encontrada' });

            await inscricao.update(req.body);
            res.json(inscricao);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async deletar(req, res) {
        try {
            const { id } = req.params;
            const inscricao = await InscricaoEmprego.findByPk(id);
            if (!inscricao) return res.status(404).json({ erro: 'Inscrição não encontrada' });

            await inscricao.destroy();
            res.json({ mensagem: "Inscrição removida com sucesso" });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
