const knex = require('../conexao');

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const categoria = await knex('categorias').where('id', categoria_id).first();

        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        const idUsuario = req.usuario.id;

        const transacao = await knex('transacoes').insert({ descricao, valor, data, categoria_id, tipo, usuario_id: idUsuario }).returning('*');

        return res.status(201).json(transacao);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const listarTransacoes = async (req, res) => {
    try {
        const idUsuario = req.usuario.id;

        const transacoes = await knex('transacoes').where('usuario_id', idUsuario);

        return res.status(200).json(transacoes);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const transacao = await knex('transacoes').where('id', id).first();

        if (!transacao) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const idUsuario = req.usuario.id;

        if (transacao.usuario_id !== idUsuario) {
            return res.status(401).json({ mensagem: 'Transação não pertence ao usuário logado.' });
        }

        return res.status(200).json(transacao);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const atualizarTransacao = async (req, res) => {
    const { id } = req.params;
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const transacao = await knex('transacoes').where('id', id).first();

        if (!transacao) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const idUsuario = req.usuario.id;

        if (transacao.usuario_id !== idUsuario) {
            return res.status(401).json({ mensagem: 'Transação não pertence ao usuário logado.' });
        }

        const categoria = await knex('categorias').where('id', categoria_id).first();

        if (!categoria) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        const novaTransacao = {
            descricao,
            valor,
            data,
            categoria_id,
            tipo
        };

        await knex('transacoes').where('id', id).update(novaTransacao);

        return res.status(204).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const excluirTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const transacao = await knex('transacoes').where('id', id).first();

        if (!transacao) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const idUsuario = req.usuario.id;

        if (transacao.usuario_id !== idUsuario) {
            return res.status(401).json({ mensagem: 'Transação não pertence ao usuário logado.' });
        }

        await knex('transacoes').where('id', id).delete();

        return res.status(204).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const obterExtrato = async (req, res) => {
    try {
        const tipos = ['entrada', 'saida'];

        const idUsuario = req.usuario.id;

        const entradas = await knex('transacoes').where('tipo', tipos[0]).andWhere('usuario_id', idUsuario);
        let somaEntradas = 0;

        if (entradas) {
            for (const entrada of entradas) {
                somaEntradas += entrada.valor;
            }
        }

        const saidas = await knex('transacoes').where('tipo', tipos[1]).andWhere('usuario_id', idUsuario);
        let somaSaidas = 0;

        if (saidas) {
            for (const saida of saidas) {
                somaSaidas += saida.valor;
            }
        }

        return res.status(200).json({ "entrada": somaEntradas, "saida": somaSaidas });

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    cadastrarTransacao,
    listarTransacoes,
    detalharTransacao,
    atualizarTransacao,
    excluirTransacao,
    obterExtrato
};