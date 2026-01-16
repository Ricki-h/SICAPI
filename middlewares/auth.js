const jwt = require('jsonwebtoken');
const JWT_SECRET = 'xghosts-goats';

module.exports = function(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader)
        return res.status(401).json({ erro: "Token não enviado" });
    
    const token = authHeader.split(' ')[1];
    
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ erro: "Token inválido" });
    }
};