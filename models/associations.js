// Usuário
const Usuario = require('./Usuario');
const UsuarioComum = require('./UsuarioComum');
const UsuarioCadArca = require('./UsuarioCadArca');
const UsuarioAdm = require('./UsuarioAdm');

Usuario.hasOne(UsuarioComum, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioComum.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioCadArca, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioCadArca.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioAdm, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioAdm.belongsTo(Usuario, { foreignKey: 'id' });


// ----------------------------------------------------------------------


// Auxilio
const Auxilio = require('./Auxilio');
const SolicitacaoAuxilio = require('./SolicitacaoAuxilio');

Usuario.belongsToMany(Auxilio, {
    through: SolicitacaoAuxilio,
    foreignKey: 'usuario_id'
});

Auxilio.belongsToMany(Usuario, {
    through: SolicitacaoAuxilio,
    foreignKey: 'auxilio_id'
});

SolicitacaoAuxilio.belongsTo(Usuario, {
    foreignKey: 'usuario_id' 
});
Usuario.hasMany(SolicitacaoAuxilio, {
    foreignKey: 'usuario_id'
});

SolicitacaoAuxilio.belongsTo(Auxilio, {
    foreignKey: 'auxilio_id'
});
Auxilio.hasMany(SolicitacaoAuxilio, {
    foreignKey: 'auxilio_id'
});

Usuario.hasMany(SolicitacaoAuxilio, {
    foreignKey: 'admin_id',
    as: 'solicitacoesGerenciadas'
})
SolicitacaoAuxilio.belongsTo(Usuario, {
    foreignKey: 'admin_id',
    as: 'adminResponsavel'
})

module.exports = {
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm,
    Auxilio,
    SolicitacaoAuxilio
};