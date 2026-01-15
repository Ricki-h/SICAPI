const Professor = require('./Professor');
const Curso = require('./Curso');

Professor.hasMany(Curso, {
    foreignKey: 'professorId'
});

Curso.belongsTo(Professor, {
    foreignKey: 'professorId'
});