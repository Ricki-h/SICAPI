const Professor = require('./Professor');
const Curso = require('./Curso');
const Usuario = require('./Usuario');
const UsuarioComum = require('./UsuarioComum');
const UsuarioCadArca = require('./UsuarioCadArca');
const UsuarioAdm = require('./UsuarioAdm');

Professor.hasMany(Curso, {
    foreignKey: 'professorId'
});

Curso.belongsTo(Professor, {
    foreignKey: 'professorId'
});

Usuario.hasOne(UsuarioComum, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioComum.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioCadArca, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioCadArca.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioAdm, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioAdm.belongsTo(Usuario, { foreignKey: 'id' });

module.exports = {
    Professor,
    Curso,
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm
};