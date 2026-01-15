const Ong = require('../models/Ong');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'xghosts-goats';

module.exports = {
    async listar(req, res) {
        const ongs = await Ong.findAll();
        res.json(ongs);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const ong = await Ong.findByPk(id);
        if(!ong) return res.status(404).json({ erro: 'ONG não encontrada' });
        res.json(ong);
    },
    async me(req, res) {
        const ong = await Ong.findByPk(req.user.id);
        res.json(ong);
    },

    // ADICIONAR ESSE MÉTODO APÓS DECIDIR A MANEIRA COMO ONG VAI LOGAR
    // async criar(req, res) {
    //     try {
    //         const { senha, ...dados } = req.body;
    //         const senhaHash = await bcrypt.hash(senha, 10);

    //         const novaOng = await Ong.create({
    //             ...dados,
    //             senha: senhaHash
    //         });

    //         res.json(novaOng);
    //     }
    //     catch(error) {
    //         res.status(400).json({ erro: error.message });
    //     }
    // },

    // ADICIONAR "async atualizar(...)" AQUI
    
    async deletar(req, res) {
        const ong = await Ong.findByPk(req.user.id);
        if (!ong) return res.status(404).json({ erro: "ONG não encontrada" });

        await ong.destroy();
        res.json({ mensagem: "ONG removida" });
    }

    // ADICIONAR "async login(...)" AQUI
};