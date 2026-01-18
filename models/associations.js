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


// ----------------------------------------------------------------------


// Serviço
const CategoriaServico = require('./CategoriaServiço');
const Servico = require('./Servico');
const AgendamentoServico = require('./AgendamentoServico');

CategoriaServico.hasMany(Servico, {
    foreignKey: 'categoria'
});
Servico.belongsTo(CategoriaServico, {
    foreignKey: 'categoria'
});

Servico.belongsToMany(Usuario, {
    through: AgendamentoServico,
    foreignKey: 'servico_id'
});
Usuario.belongsToMany(Servico, {
    through: AgendamentoServico,
    foreignKey: 'usuario_id'
});

Servico.hasMany(AgendamentoServico, {
    foreignKey: 'servico_id'
});
AgendamentoServico.belongsTo(Servico, {
    foreignKey: 'servico_id'
});

Usuario.hasMany(AgendamentoServico, {
    foreignKey: 'usuario_id'
})
AgendamentoServico.belongsTo(Usuario, {
    foreignKey: 'usuario_id'
})

Usuario.hasMany(AgendamentoServico, {
    foreignKey: 'admin_id',
    as: 'agendamentosGerenciados'
})
AgendamentoServico.belongsTo(Usuario, {
    foreignKey: 'admin_id',
    as: 'adminResponsavel'
})


module.exports = {
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm,
    Auxilio,
    SolicitacaoAuxilio,
    Servico,
    CategoriaServico,
    AgendamentoServico
};