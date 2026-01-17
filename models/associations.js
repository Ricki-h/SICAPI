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

module.exports = {
    Abrigo, 
    Ong
};