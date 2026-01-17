const EmpregoOportunidade = require('./EmpregoOportunidade');
const tipoEmprego = require('./tipoEmprego');
const EmpreegoCategoria = require('./EmpregoCategoria');
const InscricaoEmprego = require('./EmpregoInscricao'); 

// Associações um-para-muitos (tipoEmprego e EmpreegoCategoria têm muitos EmpregoOportunidade)
tipoEmprego.hasMany(EmpregoOportunidade, {
    foreignKey: 'Tipoid'
});

EmpreegoCategoria.hasMany(EmpregoOportunidade, {
    foreignKey: 'Categoriaid'
});

// Associações belongsTo na tabela filha (EmpregoOportunidade pertence a um tipo e uma categoria)
EmpregoOportunidade.belongsTo(tipoEmprego, {
    foreignKey: 'Tipoid'
});

EmpregoOportunidade.belongsTo(EmpreegoCategoria, {
    foreignKey: 'Categoriaid'
});


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

Usuario.hasMany(InscricaoEmprego, { foreignKey: 'ID_Usuario' });
InscricaoEmprego.belongsTo(Usuario, { foreignKey: 'ID_Usuario' });


EmpregoOportunidade.hasMany(InscricaoEmprego, { foreignKey: 'ID_OportEmprego' });
InscricaoEmprego.belongsTo(EmpregoOportunidade, { foreignKey: 'ID_OportEmprego' });

module.exports = {
    Usuario,
    UsuarioComum,
    UsuarioCadArca,
    UsuarioAdm,
    EmpreegoCategoria, 
    EmpregoOportunidade,
    tipoEmprego,
    InscricaoEmprego
};
