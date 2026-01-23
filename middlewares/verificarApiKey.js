function verificarApiKey(req, res, next) {
    const key = req.headers['x-api-key'];
    if (key !== process.env.API_KEY) {
        return res.status(403).json({ erro: "Acesso negado" });
    }
    next();
};

module.exports = verificarApiKey;