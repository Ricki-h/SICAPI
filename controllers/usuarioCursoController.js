const { UsuarioCurso, Curso, Usuario} = require('../models/associations');

exports.inscrever = async (req, res) => {
    try {
        const { cursoId } = req.body;
        const usuario_id = req.user.id;

        const inscricao = await UsuarioCurso.create({ 
            usuario_id: usuario_id,
            curso_id: cursoId
         })
         res.json(inscricao);
    } catch (error) {
        return res.status(500).json({ erro: error.message })
    }
}

exports.meusCursos = async (req, res) => {
    try {
        const usuario_id = req.user.id;
        const inscricoes = await UsuarioCurso.findAll({ 
            where: { usuario_id: usuario_id }, 
            include: [
                { model: Curso }
            ]
        }); 
        res.json(inscricoes);
    } catch (error) {
        return res.status(500).json({ erro: error.message })
    }
}

exports.quantInscritos = async (req, res) => {
    try {
        const { id } = req.params;
        const curso = await Curso.findByPk(id);

        if (!curso) { 
            return res.status(404).json('Curso não encontrado')
        }

        const total = await UsuarioCurso.count({
            where: { curso_id: id}
        });

        res.json({
            cursoId: id,
            titulo: curso.titulo,
            inscritos: total
        })
    } catch (error) {
        res.status(500).json({ erro: error.message })
    }
}