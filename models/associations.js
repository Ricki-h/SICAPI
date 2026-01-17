const Usuario = require('./Usuario');
const UsuarioComum = require('./UsuarioComum');
const UsuarioCadArca = require('./UsuarioCadArca');
const UsuarioAdm = require('./UsuarioAdm');
const Denuncia = require('./Denuncia');

// USUÁRIO

Usuario.hasOne(UsuarioComum, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioComum.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioCadArca, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioCadArca.belongsTo(Usuario, { foreignKey: 'id' });

Usuario.hasOne(UsuarioAdm, { foreignKey: 'id', onDelete: 'CASCADE' });
UsuarioAdm.belongsTo(Usuario, { foreignKey: 'id' });

// DENÚNCIA

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

module.exports = {
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm, 
    Denuncia
};