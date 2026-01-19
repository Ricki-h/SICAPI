const { PostBlog, UsuarioAdm } = require('../models/a'); 


module.exports = {
    
    async listar(req, res) {
        try {
            const posts = await PostBlog.findAll({
                include: [
                    { 
                        model: UsuarioAdm, 
                        attributes: ['id', 'nivel'] 
                    }
                ],
                order: [['Data', 'DESC']] 
            });
            res.json(posts);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    
    async listarUm(req, res) {
        try {
            const { id } = req.params;
            const post = await PostBlog.findByPk(id, {
                include: [UsuarioAdm]
            });
            
            if (!post) {
                return res.status(404).json({ erro: 'Post não encontrado' });
            }
            
            res.json(post);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },

    
    async criar(req, res) {
        try {
            const {  Titulo, Imagens, Descricao } = req.body;
            
            
            const novoPost = await PostBlog.create({
                Titulo, Imagens, Descricao, user_id: req.user.id
            });
            
            res.status(201).json(novoPost);
        } catch (error) {
            
            res.status(400).json({ erro: error.message });
        }
    },

    
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const post = await PostBlog.findByPk(id);
            
            if (!post) {
                return res.status(404).json({ erro: 'Post não encontrado' });
            }

            await post.update(req.body);
            res.json(post);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    },

    
    async deletar(req, res) {
        try {
            const { id } = req.params;
            const post = await PostBlog.findByPk(id);
            
            if (!post) {
                return res.status(404).json({ erro: 'Post não encontrado' });
            }

            await post.destroy();
            res.json({ mensagem: "Post removido com sucesso" });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
