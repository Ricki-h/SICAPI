const Professor = require('./Professor');
const Curso = require('./Curso');
const Usuario = require('./Usuario');
const UsuarioComum = require('./UsuarioComum');
const UsuarioCadArca = require('./UsuarioCadArca');
const UsuarioAdm = require('./UsuarioAdm');

// PROFESSOR E CURSO

Professor.hasMany(Curso, {
    foreignKey: 'professorId'
});

Curso.belongsTo(Professor, {
    foreignKey: 'professorId'
});

// USUÁRIO

Usuario.hasOne(UsuarioComum, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioComum.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioCadArca, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioCadArca.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioAdm, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioAdm.belongsTo(Usuario, { foreignKey: 'id' });

// USUÁRIO E CURSO
Usuario.belongsToMany(Curso, {
    through: 'UsuarioCurso',
    as: 'cursos',
    foreignKey: 'usuario_id'
});

Curso.belongsToMany(Usuario, {
    through: 'UsuarioCurso', // CRIA TABELA UsuarioCurso
    as: 'usuarios',
    foreignKey: 'curso_id'
});

module.exports = {
    Professor,
    Curso,
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm
};