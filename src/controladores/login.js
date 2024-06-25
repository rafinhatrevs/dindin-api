const pool = require('../conexao');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../configs');

const login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

        if (rowCount === 0) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
        }

        const senhaValida = await bcrypt.compare(senha, rows[0].senha);

        if (!senhaValida) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos.' });
        }

        const token = jwt.sign({ id: rows[0].id }, config.jwtSecret, { expiresIn: '8h' });

        const usuario = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        return res.status(200).json({ usuario, token });

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    login
};