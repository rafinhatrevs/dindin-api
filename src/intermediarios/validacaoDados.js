const dadosUsuario = async (req, res, next) => {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    next();
};

const dadosLogin = async (req, res, next) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    next();
}

const dadosTransacao = async (req, res, next) => {
    const { descricao, valor, data, categoria_id, tipo } = req.body;

    if (!descricao || !valor || !data || !categoria_id || !tipo) {
        return res.status(400).json({ mensagem: 'Todos os campos obrigatórios devem ser informados.' });
    }

    if (tipo !== "entrada" && tipo !== 'saida') {
        return res.status(400).json({ mensagem: 'Informe um tipo de transação válido.' });
    }

    next();
};

module.exports = {
    dadosUsuario,
    dadosLogin,
    dadosTransacao
};