const Ong = require('./Ong')
const Abrigo = require('./Abrigo');

Ong.hasMany(Abrigo, {
    foreignKey: 'ongId',
    onDelete: 'CASCADE'
});

Abrigo.belongsTo(Ong, {
    foreignKey: 'ongId'
});

module.exports = {
    Abrigo, 
    Ong
};