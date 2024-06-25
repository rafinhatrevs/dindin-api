const pool = require('../conexao');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const validarLogin = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, config.jwtSecret);

        const { rows, rowCount } = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [id]);

        if (rowCount === 0) {
            return res.status(401).json({ mensagem: 'Para acessar este recurso um token de autenticação válido deve ser enviado.' });
        }

        const usuario = rows[0];

        req.usuario = usuario;

        next();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = validarLogin;