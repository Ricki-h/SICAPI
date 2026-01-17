const Professor = require('./Professor');
const Curso = require('./Curso');
const Usuario = require('./Usuario');
const UsuarioComum = require('./UsuarioComum');
const UsuarioCadArca = require('./UsuarioCadArca');
const UsuarioAdm = require('./UsuarioAdm');
const UsuarioCurso = require('./UsuarioCurso');

// PROFESSOR E CURSO
Curso.hasMany(Professor, {
    foreignKey: 'cursoId'
});

Professor.belongsTo(Curso, {
    foreignKey: 'cursoId'
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
    through: UsuarioCurso,
    foreignKey: 'usuario_id'
});

Curso.belongsToMany(Usuario, {
    through: UsuarioCurso, 
    foreignKey: 'curso_id'
});

Curso.hasMany(UsuarioCurso, {
    foreignKey: 'curso_id'
});

UsuarioCurso.belongsTo(Curso, {
    foreignKey: 'curso_id'
});

module.exports = {
    Professor,
    Curso,
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm, 
    UsuarioCurso
};