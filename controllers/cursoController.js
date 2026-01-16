const Curso = require('../models/Curso');
const Professor = require('../models/Professor');

module.exports = {
    async listar(req, res) {
        try {
            const cursos = await Curso.findAll();
            res.json(cursos);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }   
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);
        if(!curso) return res.status(404).json({ erro: 'Usuário não encontrado' });
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

            await curso.update(req.body);
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