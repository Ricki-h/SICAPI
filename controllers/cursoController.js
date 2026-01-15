const Curso = require('../models/Curso');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'xghosts-goats';

module.exports = {
    async listar(req, res) {
        const cursos = await Curso.findAll();
        res.json(cursos);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if(!curso) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(curso);
    },
    async me(req, res) {
        const curso = await Curso.findByPk(req.params.id);
        res.json(curso);
    },
    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novoCurso = await Curso.create({
                ...dados
            });

            res.json(novoCurso);
        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const curso = await Curso.findByPk(req.params.id);
            if(!curso) return res.status(404).json({ erro: 'Curso não encontrado' });

            let dados = req.body;
            if(dados.senha) {
                dados.senha = await bcrypt.hash(dados.senha, 10)
            };     

            await curso.update(dados);
            res.json(curso);

        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },

    async deletar(req, res) {
        const curso = await Curso.findByPk(req.params.id);
        if (!curso) return res.status(404).json({ erro: "Curso não encontrado" });

        await curso.destroy();
        res.json({ mensagem: "Curso removido" });
    }
    
    // UPDATE ICON E UPDATE FOTO

};