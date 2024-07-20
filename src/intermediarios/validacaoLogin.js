const knex = require('../conexao');
const jwt = require('jsonwebtoken');

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);

        const usuario = await knex('usuarios').where('id', id).first();

        if (!usuario) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = validarLogin;