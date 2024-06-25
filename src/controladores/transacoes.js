const pool = require('../conexao');

const cadastrarTransacao = async (req, res) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    try {
        const { rowCount } = await pool.query(`SELECT * FROM categorias WHERE id = $1`, [categoria_id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        const idUsuario = req.usuario.id;

        const { rows } = await pool.query(`INSERT INTO transacoes (descricao, valor, data, categoria_id, tipo, usuario_id)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [descricao, valor, data, categoria_id, tipo, idUsuario]);

        const transacao = rows[0];

        return res.status(201).json(transacao);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const listarTransacoes = async (req, res) => {
    try {
        const idUsuario = req.usuario.id;

        const { rows } = await pool.query(`SELECT * FROM transacoes WHERE usuario_id = $1`, [idUsuario]);

        const transacoes = rows;

        return res.status(200).json(transacoes);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const detalharTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM transacoes WHERE id = $1`, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const transacao = rows[0];

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
        const { rows, rowCount } = await pool.query(`SELECT * FROM transacoes WHERE id = $1`, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const transacao = rows[0];

        const idUsuario = req.usuario.id;

        if (transacao.usuario_id !== idUsuario) {
            return res.status(401).json({ mensagem: 'Transação não pertence ao usuário logado.' });
        }

        const categoria = await pool.query(`SELECT * FROM categorias WHERE id = $1`, [categoria_id]);

        if (categoria.rowCount === 0) {
            return res.status(404).json({ mensagem: 'Categoria não encontrada.' });
        }

        await pool.query(`
        UPDATE
         transacoes 
        SET
          descricao = $1,
          valor = $2,
          data = $3,
          categoria_id = $4,
          tipo = $5
        WHERE
          id = $6`, [descricao, valor, data, categoria_id, tipo, id]);

        return res.status(204).send();

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

const excluirTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const { rows, rowCount } = await pool.query(`SELECT * FROM transacoes WHERE id = $1`, [id]);

        if (rowCount === 0) {
            return res.status(404).json({ mensagem: 'Transação não encontrada.' });
        }

        const transacao = rows[0];

        const idUsuario = req.usuario.id;

        if (transacao.usuario_id !== idUsuario) {
            return res.status(401).json({ mensagem: 'Transação não pertence ao usuário logado.' });
        }

        await pool.query(`DELETE FROM transacoes WHERE id = $1`, [id]);

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

        const entradas = await pool.query(`SELECT valor FROM transacoes WHERE tipo = $1 AND usuario_id = $2`, [tipos[0], idUsuario]);
        let somaEntradas = 0;

        if (entradas.rowCount !== 0) {
            for (const entrada of entradas.rows) {
                somaEntradas += entrada.valor;
            }
        }

        const saidas = await pool.query(`SELECT valor FROM transacoes WHERE tipo = $1 AND usuario_id = $2`, [tipos[1], idUsuario]);
        let somaSaidas = 0;

        if (saidas.rowCount !== 0) {
            for (const saida of saidas.rows) {
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