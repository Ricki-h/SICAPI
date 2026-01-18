const { Denuncia, Usuario, UsuarioAdm} = require('../models/associations');

module.exports = {
    async listar(req, res) {
        const denuncias = await Denuncia.findAll();
        res.json(denuncias);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const denuncia = await Denuncia.findByPk(id, {
            include: [
                { model: Usuario, as: 'autor' },
                { model: UsuarioAdm, as: 'adminResponsavel' }
            ]
        });
        if(!denuncia) return res.status(404).json({ erro: 'Denúncia não encontrada' });
        res.json(denuncia);
    },
    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novaDenuncia = await Denuncia.create({
                ...dados
            });
            res.json(novaDenuncia);
        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const denuncia = await Denuncia.findByPk(req.params.id);
            if(!denuncia) return res.status(404).json({ erro: 'Denúncia não encontrada' });

            await denuncia.update(req.body);
            res.json(denuncia);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const denuncia = await Denuncia.findByPk(req.params.id);
        if (!denuncia) return res.status(404).json({ erro: "Denúncia não encontrada" });

        await denuncia.destroy();
        res.json({ mensagem: "Denúncia removida" });
    },
    async minhasDenuncias(req, res) {
        try {
            const denuncias = await Denuncia.findAll({
                where: { user_id: req.user.id },
                include: [
                    { model: UsuarioAdm, as: 'adminResponsavel' }
                ]
            });

            res.json(denuncias);
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async denunciasGerenciadas (req, res) {
        try {
            const denuncias = await Denuncia.findAll({
                where: { admin_id: req.user.id },
                include: [
                    { model: Usuario, as: 'autor' },
                ]
            });
            res.json(denuncias);
        } catch (error) {
            res.status(500).json({ erro: error.message })
        }
    }

};
