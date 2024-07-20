const knex = require('../conexao');
const bcrypt = require('bcrypt');

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const emailEncontrado = await knex('usuarios').where('email', email).first();

        if (emailEncontrado) {
            return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const usuario = await knex('usuarios').insert({ nome, email, senha: senhaCriptografada }).returning('*');

        const novoUsuario = {
            id: usuario[0].id,
            nome: usuario[0].nome,
            email: usuario[0].email
        };

        return res.status(201).json(novoUsuario);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharUsuario = async (req, res) => {
    try {
        const idUsuario = req.usuario.id;

        const usuarioEncontrado = await knex('usuarios').where('id', idUsuario).first();

        if (!usuarioEncontrado) {
            return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
        }

        const usuario = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email
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
        const emailEncontrado = await knex('usuarios').where('email', email).first();

        if (emailEncontrado) {
            return res.status(400).json({ mensagem: 'O email informado já está em uso.' });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const idUsuario = req.usuario.id;

        const usuario = {
            nome,
            email,
            senha: senhaCriptografada
        };

        await knex('usuarios').where('id', idUsuario).update(usuario);

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