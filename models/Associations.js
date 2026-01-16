const EmpregoOportunidade = require('./EmpregoOportunidade');
const tipoEmprego = require('./tipoEmprego');
const EmpreegoCategoria = require('./EmpregoCategoria');

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
