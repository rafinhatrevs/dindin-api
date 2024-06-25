const pool = require('../conexao');

const listarCategorias = async (req, res) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM categorias`);

        return res.status(200).json(rows);

    } catch (error) {
        //console.log(error);
        return res.status(500).json({ mensagem: 'Erro interno do servidor.' });
    }
};

module.exports = {
    listarCategorias
};