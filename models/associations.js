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


// ----------------------------------------------------------------------


// Denúncia
const Denuncia = require('./Denuncia');
Usuario.hasMany(Denuncia, { 
    foreignKey: 'user_id', as: 'denunciasCriadas', onDelete: 'CASCADE' 
});
Denuncia.belongsTo(Usuario, { 
    foreignKey: 'user_id', as: 'autor' 
});

UsuarioAdm.hasMany(Denuncia, { 
    foreignKey: 'admin_id', as: 'denunciasGerenciadas', onDelete: 'CASCADE' 
});
Denuncia.belongsTo(UsuarioAdm, { 
    foreignKey: 'admin_id', as: 'adminResponsavel' 
});


// ----------------------------------------------------------------------


// ONGs
const Ong = require('./Ong')
const Abrigo = require('./Abrigo');
Ong.hasMany(Abrigo, {
    foreignKey: 'ongId',
    as: 'abrigosGerenciados',
    onDelete: 'CASCADE'
});

Abrigo.belongsTo(Ong, {
    foreignKey: 'ongId',
    as: 'ongResponsavel'
});


// ----------------------------------------------------------------------


// Curso e professor
const Professor = require('./Professor');
const Curso = require('./Curso');
const UsuarioCurso = require('./UsuarioCurso');
Curso.hasMany(Professor, {
    foreignKey: 'cursoId'
});

Professor.belongsTo(Curso, {
    foreignKey: 'cursoId'
});
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


// ----------------------------------------------------------------------


// Oportunidades de emprego
const TipoEmprego = require('./TipoEmprego');
const EmpregoCategoria = require('./EmpregoCategoria');
const EmpregoOportunidade = require('./EmpregoOportunidade');
const InscricaoEmprego = require('./EmpregoInscricao'); 
TipoEmprego.hasMany(EmpregoOportunidade, {
    foreignKey: 'Tipoid'
});

EmpregoCategoria.hasMany(EmpregoOportunidade, {
    foreignKey: 'Categoriaid'
});

EmpregoOportunidade.belongsTo(TipoEmprego, {
    foreignKey: 'Tipoid'
});

EmpregoOportunidade.belongsTo(EmpregoCategoria, {
    foreignKey: 'Categoriaid'
});


// ----------------------------------------------------------------------


// Post-blog
const PostBlog = require('./Post_blog');
UsuarioAdm.hasMany(PostBlog, { foreignKey: 'ID_Admin', as: 'postcriados'  });
PostBlog.belongsTo(UsuarioAdm, { foreignKey: 'ID_Admin', as: 'autor' });

module.exports = {
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm,
    Auxilio,
    SolicitacaoAuxilio,
    Servico,
    CategoriaServico,
    AgendamentoServico,
    Denuncia,
    Ong,
    Abrigo,
    Professor,
    Curso,
    UsuarioCurso,
    EmpregoCategoria, 
    EmpregoOportunidade,
    TipoEmprego,
    InscricaoEmprego,
    PostBlog
};