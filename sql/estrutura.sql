CREATE TABLE dindin;

CREATE TABLE usuarios (
	id serial primary key,
    nome varchar NOT NULL,
    email varchar NOT NULL UNIQUE,
    senha varchar NOT NULL
);

CREATE TABLE categorias (
	id serial primary key,
    descricao varchar NOT NULL
);

CREATE TABLE transacoes (
	id serial primary key,
    descricao varchar NOT NULL,
    valor integer NOT NULL,
    data date NOT NULL,
    categoria_id integer NOT NULL references categorias(id),
    usuario_id integer NOT NULL references usuarios(id),
    tipo varchar NOT NULL
);