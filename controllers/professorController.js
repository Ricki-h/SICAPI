const Professor = require('../models/Professor');
const Curso = require('../models/Curso');

module.exports = {
    async listar(req, res) {
        const professores = await Professor.findAll();
        res.json(professores);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const professor = await Professor.findByPk(id, {
            include: Curso
        });
        if(!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
        res.json(professor);
    },
    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novoProfessor = await Professor.create({
                ...dados
            });

            res.json(novoProfessor);
        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const professor = await Professor.findByPk(req.params.id);
            if(!professor) return res.status(404).json({ erro: 'Professor não encontrado' });
            
            await professor.update(req.body);
            res.json(professor);

        } catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const professor = await Professor.findByPk(req.params.id);
        if (!professor) return res.status(404).json({ erro: "Professor não encontrado" });

        await professor.destroy();
        res.json({ mensagem: "Professor removido" });
    }
    
    // UPDATE ICON

};