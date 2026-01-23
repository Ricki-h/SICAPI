const { Usuario } = require('../models/associations');
const { Auxilio } = require('../models/associations')
const { SolicitacaoAuxilio } = require('../models/associations')
const { UsuarioAdm } = require('../models/associations') 

exports.solicitarAuxilio = async (req, res) => {
    try {
        const { auxilio_id } = req.body;
        const usuario_id = req.user.id;

        const admsNvl2 = await UsuarioAdm.findAll({
            where: {
                nivel: 2
            },
            include: [{ model: Usuario }]
        });

        if(admsNvl2.length === 0) {
            return res.status(500).json({ erro: 'Nenhum Administrador adequado encontrado' })
        };

        const admAleatorio = admsNvl2[Math.floor(Math.random() * admsNvl2.length)];
        console.log(admAleatorio.toJSON());

        const solicitacao = await SolicitacaoAuxilio.create({
            usuario_id,
            auxilio_id,
            admin_id: admAleatorio.id
        });

        return res.json({
            mensagem: 'Solicitação criada com sucesso',
            admin_responsavel: {
                id: admAleatorio.id,
                nome: admAleatorio.Usuario.nome
            },
            solicitacao
        });
    }
    catch(error) {
        res.status(500).json({ erro: error.message })
    }
};

exports.meusAuxilios = async (req, res) => {
        const id = req.user.id;

        const solicitacoes = await SolicitacaoAuxilio.findAll({
            where: { usuario_id: id },
            include: [{ model: Auxilio }]
        });

        res.json(solicitacoes)
};

exports.meuAuxilio = async (req, res) => {
    const { id } = req.params;
    const user_id = req.user.id;

    const solicitacao = await SolicitacaoAuxilio.findAll({
        where: {
            id: id,
            usuario_id: user_id
        }
    })

    res.json(solicitacao)
}

 exports.atualizarStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const admin_id = req.user.id;

        const solicitacao = await SolicitacaoAuxilio.findByPk(id);
        if(!solicitacao) return res.status(404).json({ erro: 'Solicitação não encontrada' });

        if(solicitacao.admin_id != admin_id) {
            return res.status(500).json({ erro: 'Você não é responsável por esse solicitação' })
        }

        solicitacao.status = status;
        await solicitacao.save();

        res.json(solicitacao);
    } catch(error) {
        res.status(500).json({ erro: error.message })
    }
 };

 exports.minhasGerencias = async (req, res) => {
    const admin_id = req.user.id;

    const solicitacoes = await SolicitacaoAuxilio.findAll({
        where: { admin_id: admin_id },
        include: [Usuario, Auxilio]
    });

    res.json(solicitacoes);
 };

  exports.minhaGerencia = async (req, res) => {
    const admin_id = req.user.id;
    const { id } = req.params;

    const solicitacao = await SolicitacaoAuxilio.findAll({
        where: { admin_id: admin_id, id: id },
        include: [Usuario, Auxilio]
    });

    res.json(solicitacao);
 };