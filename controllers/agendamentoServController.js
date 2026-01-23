const { AgendamentoServico, Servico, Usuario, UsuarioAdm } = require('../models/associations');

module.exports = {
    async agendar(req, res) {
        try {
            const { servico_id } = req.body;
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
    
            const agendamento = await AgendamentoServico.create({
                servico_id,
                usuario_id,
                admin_id: admAleatorio.id
            })
    
            return res.json({
                mensagem: 'Serviço agendado com sucesso',
                admin_responsavel: {
                    id: admAleatorio.id,
                    nome: admAleatorio.Usuario.nome
                },
                agendamento
            });
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        } 
    },
    async meusServicos(req, res) {
        try {
            const id = req.user.id;
    
            const agendamentos = await AgendamentoServico.findAll({
                where: { usuario_id: id },
                include: [{ model: Servico }]
            })
    
            res.json(agendamentos)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async meuServico(req, res) {
        try {
            const { id } = req.params;
            const userId = req.user.id;

            const agendamento = await AgendamentoServico.findAll({
                where: {
                    id: id,
                    usuario_id: userId
                },
                include: [{ model: Servico }]
            });
            res.json(agendamento);
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async minhasGerencias(req, res) {
        try {
            const adminId = req.user.id;
    
            const agendamentos = await AgendamentoServico.findAll({
                where: { admin_id: adminId },
                include: [{ model: Servico }, { model: Usuario }]
            });
            res.json(agendamentos);
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async minhaGerencia(req, res) {
        try {
            const adminId = req.user.id;
            const { id } = req.params
    
            const agendamento = await AgendamentoServico.findAll({
                where: { admin_id: adminId, id: id },
                include: [{ model: Servico }, { model: Usuario }]
            });
            res.json(agendamento)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    },
    async atualizarStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const adminId = req.user.id;
            
            const agendamento = await AgendamentoServico.findByPk(id);
            if(!agendamento) return res.status(500).json({ erro: 'Agendamento não existe '});
            
            if(agendamento.admin_id != adminId) {
                return res.status(500).json({ erro: 'Você não é responsável por esse Agendamento' })
            };

            agendamento.status = status;
            await agendamento.save()

            res.json(agendamento)
        } catch(error) {
            return res.status(500).json({ erro: error.message });
        }
    }
}