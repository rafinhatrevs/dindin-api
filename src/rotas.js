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

rotas.post('/usuario', dadosUsuario, cadastrarUsuario);
rotas.post('/login', dadosLogin, login);

rotas.use(validarLogin);

// rotas usuarios
rotas.get('/usuario', detalharUsuario);
rotas.put('/usuario', dadosUsuario, atualizarUsuario);

// rotas categorias
rotas.get('/categoria', listarCategorias);

// rotas transacoes
rotas.post('/transacao', dadosTransacao, cadastrarTransacao);
rotas.get('/transacao', listarTransacoes);
rotas.get('/transacao/extrato', obterExtrato);
rotas.get('/transacao/:id', detalharTransacao);
rotas.put('/transacao/:id', dadosTransacao, atualizarTransacao);
rotas.delete('/transacao/:id', excluirTransacao);

module.exports = rotas;