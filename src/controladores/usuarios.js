const pool = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const { rowCount } = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const { rows } = await pool.query(`INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3) RETURNING *`, [nome, email, senhaCriptografada]);

        const usuario = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        return res.status(201).json(usuario);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharUsuario = async (req, res) => {
    try {
        const idUsuario = req.usuario.id;

        const { rowCount } = await pool.query(`SELECT * FROM usuarios WHERE id = $1`, [idUsuario]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const usuario = {
            id: rows[0].id,
            nome: rows[0].nome,
            email: rows[0].email
        };

        return res.status(200).json(usuario);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const atualizarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const { rowCount } = await pool.query(`SELECT * FROM usuarios WHERE email = $1`, [email]);

        if (rowCount > 0) {
            return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const idUsuario = req.usuario.id;

        await pool.query(`UPDATE usuarios SET nome = $1, email = $2, senha =$3 WHERE id = $4`, [nome, email, senhaCriptografada, idUsuario]);

        return res.status(204).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    cadastrarUsuario,
    detalharUsuario,
    atualizarUsuario
};