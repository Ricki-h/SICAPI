exports.isCadArca = (req, res, next) => {
    if(req.user.tipo !== 'cadarca') {
        return res.status(403).json({ erro: 'Apenas Usuário CadArca'})
    }
    next()
}

exports.isAdmin = (req, res, next) => {
    if(req.user.tipo !== 'adm') {
        return res.status(403).json({ erro: 'Apenas Administradores'})
    }
    next()
};
exports.nivelMinimo = (nivel) => {
    return (req, res, next) => {
        if(req.user.nivel < nivel) {
            return res.status(403).json({ erro: 'Permissão insuficiente '})
        }
        next()
    };
};