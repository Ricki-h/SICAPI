const jwt = require('jsonwebtoken');
const JWT_SECRET = 'xghosts-goats';

module.exports = function(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader)
        return res.status(401).json({ erro: "Token não enviado" });

    const parts = authHeader.split(' ');

    if (parts.length !== 2)
        return res.status(401).json({ erro: "Token malformado" });

    const [scheme, token] = parts;

    if (scheme !== "Bearer")
        return res.status(401).json({ erro: "Formato incorreto. Use: Bearer <token>" });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ erro: "Token inválido" });
    }
};