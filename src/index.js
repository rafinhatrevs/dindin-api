const express = require('express');
const rotas = require('./rotas');
const config = require('./configs');

const app = express();

app.use(express.json());

app.use(rotas);

app.listen(config.serverPort, () => {
    console.log(`Servidor rodando na porta ${config.serverPort}.`);
});