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
            const admsNvl2 = await UsuarioAdm.findAll({
                where: {
                    nivel: 2
                },
                include: [{ model: Usuario }]
            });

            if(admsNvl2.length === 0) {
                return res.status(500).json({ erro: 'Nenhum Administrador adequado encontrado' })
            };

            const admAleatorio = admsNvl2[Math.floor(Math.random() * admsNvl2.length)];
            
            const { titulo, local, descricao, tipo, data } = req.body;
            const fotos = req.files ? req.files.map(file => file.path) : [];

            const novaDenuncia = await Denuncia.create({
                titulo,
                local,
                descricao,
                tipo,
                status: 'Pendente',
                user_id: req.user.id,
                admin_id: admAleatorio.id,
                fotos, 
                data
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
    // async assumir(req, res) {
    //     const denuncia = await Denuncia.findByPk(req.params.id);

    //     if (!denuncia) return res.status(404).json({ erro: 'Denúncia não encontrada' });
    //     if (denuncia.admin_id) return res.status(400).json({ erro: 'Denúncia já possui Administrador' });
        
    //     await denuncia.update({
    //         admin_id: req.user.id,
    //         status: 'Em análise'
    //     });

    //     res.json(denuncia);
    // }

};
