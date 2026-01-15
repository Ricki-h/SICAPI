const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'xghosts-goats';

module.exports = {
    async listar(req, res) {
        const usuarios = await Usuario.findAll();
        res.json(usuarios);
    },
    async listarUm(req, res) {
        const { id } = req.params;
        const usuario = await Usuario.findByPk(id);
        if(!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
        res.json(usuario);
    },
    async me(req, res) {
        const usuario = await Usuario.findByPk(req.user.id);
        res.json(usuario);
    },
    async criar(req, res) {
        try {
            const { senha, ...dados } = req.body;
            const senhaHash = await bcrypt.hash(senha, 10);

            const novoUsuario = await Usuario.create({
                ...dados,
                senha: senhaHash
            });

            res.json(novoUsuario);
        }
        catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.user.id);
            if(!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
            const { email, telefone } = req.body;
            if (email && email !== usuario.email) {
                const existeEmail = await Usuario.findOne({ where: { email } });
                if (existeEmail)
                    return res.status(400).json({ erro: "Email já cadastrado" });
            }
            if (telefone && telefone !== usuario.telefone) {
                const existeTel = await Usuario.findOne({ where: { telefone } });
                if (existeTel)
                    return res.status(400).json({ erro: "Telefone já cadastrado" });
            }

            let dados = req.body;
            if(dados.senha) {
                dados.senha = await bcrypt.hash(dados.senha, 10)
            };
            
            await usuario.update(dados);
            res.json(usuario);
        }
        catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },
    async deletar(req, res) {
        const usuario = await Usuario.findByPk(req.user.id);
        if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

        await usuario.destroy();
        res.json({ mensagem: "Usuário removido" });
    },
    async updateIcon(req, res) {
        console.log("Chegou no updateIcon!");
        console.log("File recebido:", req.file);
        console.log("Body:", req.body);
        try {
            const usuario = await Usuario.findByPk(req.user.id);
            if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

            usuario.icon =req.file.path;
            await usuario.save();
            res.json({ mensagem: "Icon atualizado", icon: usuario.icon });
        }
        catch(error) {
            res.status(400).json({ erro: error.message });
        }
    },


    async login(req, res) {
        const { cpf, senha } = req.body;

        const usuario = await Usuario.findOne({ where: { cpf } });
        if (!usuario) return res.status(404).json({ erro: "CPF não encontrado" });

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

        const token = jwt.sign(
            { id: usuario.id, cpf: usuario.cpf },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ messagem: 'Login OK ', token })
    }
};