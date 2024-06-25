### dindin-api
Desafio DDS M03 - API Dindin

<p align="center">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/rafinhatrevs/dindin-api">
  
  <a href="https://github.com/rafinhatrevs/dindin-api/commits/main/">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rafinhatrevs/dindin-api">
  </a>
  
  <a href="https://www.linkedin.com/in/rafaellatrevizan/">
    <img alt="Feito por Rafaella Trevizan" src="https://img.shields.io/badge/feito-por%20Rafaella%20Trevizan-D818A5">
  </a>

  <img alt="Status Em Desenvolvimento" src="https://img.shields.io/badge/status-EM%20DESENVOLVIMENTO-green">
</p>   

# API Dindin

Esta é uma API para gerenciamento financeiro pessoal. O objetivo desta API é permitir que os usuários realizem operações relacionadas a cadastro e autenticação de usuários, bem como a gestão de categorias e transações financeiras.
Projeto desenvolvido durante a turma 16 de Desenvolvimento de Software | Back-End oferecida pela Cubos Academy.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  💻 Estrutura do Projeto

- **index.js:** Arquivo principal da aplicação que configura o servidor Express e as rotas.
- **rotas.js:** Arquivo que contém as definições das rotas da API.
- **conexao.js:** Arquivo de configuração da conexão com o banco de dados PostgreSQL utilizando pool de conexões.
- **configs.js:** Arquivo de configuração que armazena dados sensíveis e de configuração.
  
#### controladores/:
- **usuarios.js:** Controlador responsável por lidar com operações relacionadas aos usuários, como cadastrar, detalhar e atualizar usuários. 
- **login.js:** Controlador responsável pelo login de usuários. 
- **categorias.js:** Controlador responsável por listar todas as categorias cadastradas.
- **transacoes.js:** Controlador responsável por lidar com as transações de cada usuário.
  
#### intermediários/:
- **validacaoLogin.js:** Intermediário para autenticar o login do usuário antes de executar operações.
- **validacaoDados.js:** Intermediário para validação de preenchimento obrigatório de dados. 

#### sql/: 
- **estrutura.sql:** Estrutura do banco de dados e suas tabelas.
- **categorias.sql:** Inserção de dados na tabela categorias. 

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⚙️ Funcionalidades

- **Cadastrar Usuário:** `POST` `/usuarios`  
  Endpoint para cadastrar um novo usuário.
- **Login de Usuário:** `POST` `/login`  
  Endpoint para efetuar o login do usuário.
- **Detalhar Usuário:** `GET` `/usuarios`   
  Endpoint para detalhar o usuário logado.
- **Atualizar Usuário:** `PUT` `/usuarios`  
  Endpoint para atualizar o usuário logado.
- **Listar Categorias:** `GET` `/categorias`   
  Endpoint para que o usuário logado consiga listar todas as categorias cadastradas.
- **Cadastrar Transação:** `POST` `/transacoes`     
  Endpoint para cadastrar uma transação para o usuário logado.
- **Listar Transações:** `GET` `/transacoes`  
  Endpoint para listar todas as transações do usuário logado.
- **Extrato:** `GET` `/transacoes/extrato`  
  Endpoint para obter o extrato de transações do usuário logado.
- **Detalhar Transação:** `GET` `/transacoes/:id`  
  Endpoint para detalhar uma transação do usuário logado.
- **Atualizar Transação:** `PUT` `/transacoes/:id`  
  Endpoint para atualizar uma transação do usuário logado.
- **Excluir Transação:** `DELETE` `/transacoes/:id`  
  Endpoint para excluir uma transação do usuário logado.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### ⭐ Como executar o projeto

#### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

1. [Git](https://git-scm.com)
2. [Node.js](https://nodejs.org/en/)
3. [PostgreSQL](https://www.postgresql.org/)
4. [Beekeeper Studio](https://www.beekeeperstudio.io/)
   
**Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/).**

#### 🎲 Rodando o Backend (servidor)

```bash

# Clone este repositório
$ git clone git@github.com:rafinhatrevs/dindin-api.git

# Acesse a pasta do projeto no terminal/cmd
$ cd dindin-api

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3000 - acesse http://localhost:3000

```

<p align="center">
  <a href="https://insomnia.rest/run/?label=&uri=https://raw.githubusercontent.com/rafinhatrevs/dindin-api-insomnia/main/Insomnia_2024-06-25.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>
</p>

#### Exemplos de requisições (Body JSON)

```javascript

// POST /usuarios
{
	"nome": "nome",
	"email": "nome@email.com",
	"senha": "123456"
}

```

```javascript

// POST /login
{
	"email": "nome@email.com",
	"senha": "123456"
}

```

```javascript

// PUT /usuarios
{
	"nome": "nome",
	"email": "nome@email.com",
	"senha": "123456"
}

```

```javascript

// POST /transacoes
{
	"descricao": "Pets",
	"valor": 10000,
	"data": "2024-06-25",
	"categoria_id": 9,
	"tipo": "saida"
}

```

```javascript

// PUT /transacoes
{
	"descricao": "Salário",
	"valor": 300000,
	"data": "2024-06-25",
	"categoria_id": 14,
	"tipo": "entrada",
}

```

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 🛠 Tecnologias Utilizadas

- **Node.js:** Ambiente de execução JavaScript.
- **Express.js:** Framework web para Node.js utilizado para criar a API RESTful.
- **Nodemon:** Utilitário que monitora as alterações nos arquivos e reinicia automaticamente o servidor quando necessário.
- **PostgreSQL:** Sistema de gerenciamento de banco de dados relacional open-source.
- **Beekeeper Studio:** Ferramenta GUI multiplataforma para gerenciar bancos de dados.
- **bcrypt:** Função de hashing criptográfico utilizada para armazenar senhas de forma segura em bancos de dados.
- **jsonwebtoken:** Implementação de tokens JWT (JSON Web Tokens) para autenticação segura entre partes.

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

### 💪 Como contribuir para o projeto

1. Faça um **fork** do projeto.
2. Crie uma nova branch com as suas alterações: `git checkout -b my-feature`.
3. Salve as alterações e crie uma mensagem de commit contando o que você fez: `git commit -m "feature: My new feature"`.
4. Envie as suas alterações: `git push origin my-feature`.
> Caso tenha alguma dúvida confira este [guia de como contribuir no GitHub](https://docs.github.com/pt/get-started/exploring-projects-on-github/contributing-to-a-project).

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

###  🔑 Licença

Este projeto é licenciado por [MIT](https://opensource.org/license/mit).

<img src="https://user-images.githubusercontent.com/74038190/212284115-f47cd8ff-2ffb-4b04-b5bf-4d1c14c0247f.gif" width="1000">

**Feito com 💜 por Rafaella Trevizan [Entre em contato!](https://www.linkedin.com/in/rafaellatrevizan/)**
