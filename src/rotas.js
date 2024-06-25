const express = require('express');

// validacoes
const validarLogin = require('./intermediarios/validacaoLogin');
const { dadosLogin, dadosUsuario, dadosTransacao } = require('./intermediarios/validacaoDados');

// controladores
const { login } = require('./controladores/login');
const { cadastrarUsuario, detalharUsuario, atualizarUsuario } = require('./controladores/usuarios');
const { listarCategorias } = require('./controladores/categorias');
const { cadastrarTransacao, listarTransacoes, detalharTransacao, atualizarTransacao, excluirTransacao, obterExtrato } = require('./controladores/transacoes');


const rotas = express();

rotas.post('/usuarios', dadosUsuario, cadastrarUsuario);
rotas.post('/login', dadosLogin, login);

rotas.use(validarLogin);

// rotas usuarios
rotas.get('/usuarios', detalharUsuario);
rotas.put('/usuarios', dadosUsuario, atualizarUsuario);

// rotas categorias
rotas.get('/categorias', listarCategorias);

// rotas transacoes
rotas.post('/transacoes', dadosTransacao, cadastrarTransacao);
rotas.get('/transacoes', listarTransacoes);
rotas.get('/transacoes/extrato', obterExtrato);
rotas.get('/transacoes/:id', detalharTransacao);
rotas.put('/transacoes/:id', dadosTransacao, atualizarTransacao);
rotas.delete('/transacoes/:id', excluirTransacao);

module.exports = rotas;