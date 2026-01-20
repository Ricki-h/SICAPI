const { Curso, Professor} = require('../models/associations');

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
        const curso = await Curso.findByPk(id, {
            include: [{ model: Professor }]
        });
        if(!curso) return res.status(404).json({ erro: 'Curso não encontrado' });
        res.json(curso);
    },
    async criar(req, res) {
        try {
            const { ...dados } = req.body;
            const novoCurso = await Curso.create({
                ...dados,
                icon: req.files.icon ? req.files.icon[0].path : null,
                foto: req.files.foto ? req.files.foto[0].path : null
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
    },
    async updateFiles(req, res) {
        try {
            const { id } = req.params;

            const curso = await Curso.findByPk(id);
            if (!curso) return res.status(404).json({ erro: "Curso não encontrado" });

            if (req.files.icon) {
                curso.icon = req.files.icon[0].path;
            }

            if (req.files.foto) {
                curso.foto = req.files.foto[0].path;
            }

            await curso.save();

            res.json(curso);
        }
        catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }

};