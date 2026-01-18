const { Usuario } = require('../models/associations');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UsuarioComum } = require('../models/associations');
const { UsuarioCadArca } = require('../models/associations');
const { UsuarioAdm } = require('../models/associations');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    async listar(req, res) {
        try {
            const usuarios = await Usuario.findAll({
                include: [
                    { model: UsuarioComum },
                    { model: UsuarioCadArca },
                    { model: UsuarioAdm }
                ]
            });
            res.json(usuarios);
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async listarUm(req, res) {
        try{
            const { id } = req.params;
            const usuario = await Usuario.findByPk(id, {
                include: [
                    { model: UsuarioComum },
                    { model: UsuarioCadArca },
                    { model: UsuarioAdm }
                ]
            });
            if(!usuario) return res.status(404).json({ erro: 'Usuário não encontrado' });
            res.json(usuario);
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async me(req, res) {
        try {
            const usuario = await Usuario.findByPk(req.user.id, {
                include: [
                    { model: UsuarioComum },
                    { model: UsuarioCadArca },
                    { model: UsuarioAdm }
                ]
            });

            res.json(usuario);
        }
        catch(error) {
            res.status(500).json({ erro: error.message })
        }
    },
    async criar(req, res) {
        try {
            const { senha, tipo, cpf, cadarca, nivel, ...dados } = req.body;

            // segurança
            const tiposValidos = ["comum", "cadArca", "adm"];
            if(!tiposValidos.includes(tipo)) {
                return res.status(400).json({ erro: "Tipo inválido" });
            }

            const senhaHash = await bcrypt.hash(senha, 10);

            if(req.body.tipo == 'cadArca' && !req.body.cadarca) {
                return res.status(400).json({ erro: "CadArca necessário" });
            }
            if(req.body.tipo != 'cadArca' && !req.body.cpf) {
                return res.status(400).json({ erro: "CPF necessário" });
            }

            const novoUsuario = await Usuario.create({
                ...dados,
                tipo,
                senha: senhaHash
            });

            // cria entidade específica
            if(tipo === "comum") {
                const exist = await UsuarioComum.findOne({ where: { id: novoUsuario.id } })
                if (exist) return res.status(400).json({ erro: 'Usuario já é comum' })
                await UsuarioComum.create({
                    id: novoUsuario.id,
                    cpf
                });
            }
            else if(tipo === "cadArca") {
                const exist = await UsuarioCadArca.findOne({ where: { id: novoUsuario.id } })
                if (exist) return res.status(400).json({ erro: 'Usuario já é cadArca' })
                await UsuarioCadArca.create({
                    id: novoUsuario.id,
                    cadarca
                });
            }
            else if(tipo === "adm") {
                const exist = await UsuarioAdm.findOne({ where: { id: novoUsuario.id } })
                if (exist) return res.status(400).json({ erro: 'Usuario já é Adm' })
                await UsuarioAdm.create({
                    id: novoUsuario.id,
                    cpf,
                    nivel
                });
            }

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
            
            delete dados.tipo;
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
    async deletarOutro(req, res) {
        const { id } = req.params
        const usuario = await Usuario.findByPk(id);
        if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

        await usuario.destroy();
        res.json({ mensagem: "Usuário removido" });
    },
    async updateIcon(req, res) {
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

    async loginComum(req, res) {
        const { cpf, senha } = req.body;

        const usuario = await UsuarioComum.findOne({ where: { cpf: cpf } });
        if(!usuario) {
            return res.status(404).json({ erro: 'CPF não encontrado' })
        };

        const usuarioP = await Usuario.findByPk(usuario.id)
        if(!usuarioP) {
            return res.status(404).json({ erro: 'Usuário principal não encontrado' })
        }

        const senhaValida = await bcrypt.compare(senha, usuarioP.senha);
        if(!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        };

        const token = jwt.sign(
            { id: usuario.id, tipo: 'comum' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ msg: 'Login Ok', token })
    },
    async loginCadArca(req, res) {
        const { cadarca, senha } = req.body;

        const usuario = await UsuarioCadArca.findOne({ where: { cadarca: cadarca } });
        if(!usuario) {
            return res.status(404).json({ erro: 'CadArca não encontrado' })
        };

        const usuarioP = await Usuario.findByPk(usuario.id)
        if(!usuarioP) {
            return res.status(404).json({ erro: 'Usuário principal não encontrado' })
        }

        const senhaValida = await bcrypt.compare(senha, usuarioP.senha);
        if(!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        };

        const token = jwt.sign(
            { id: usuario.id, tipo: 'cadArca' },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ msg: 'Login Ok', token })
    },
    async loginAdm(req, res) {
        const { cpf, senha } = req.body;

        const admin = await UsuarioAdm.findOne({ where: { cpf: cpf } });
        if(!admin) {
            return res.status(404).json({ erro: 'CPF não encontrado' })
        };
        
        const usuario = await Usuario.findByPk(admin.id)
        if(!usuario) {
            return res.status(404).json({ erro: 'Usuário principal não encontrado' })
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if(!senhaValida) {
            return res.status(401).json({ erro: 'Senha incorreta' });
        };

        const token = jwt.sign(
            { id: admin.id, tipo: 'adm', nivel: admin.nivel },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.json({ msg: 'Login Ok', token })
    }
};