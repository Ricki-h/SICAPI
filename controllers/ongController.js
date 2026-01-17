const { Abrigo, Ong } = require('../models/associations')

module.exports = {
    async listar(req, res) {
        const ongs = await Ong.findAll();
        res.json(ongs);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const ong = await Ong.findByPk(id, {         
            include: [
                { model: Abrigo },
            ]
        });
        if(!ong) return res.status(404).json({ erro: 'ONG não encontrada' });
        res.json(ong);
    },
    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novaOng = await Ong.create({
                ...dados
            });
            res.json(novaOng);
        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const ong = await Ong.findByPk(req.params.id);
            if(!ong) return res.status(404).json({ erro: 'ONG não encontrada' });

            await ong.update(req.body);
            res.json(ong);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const ong = await Ong.findByPk(req.params.id);
        if (!ong) return res.status(404).json({ erro: "ONG não encontrada" });

        await ong.destroy();
        res.json({ mensagem: "ONG removida" });
    }

};