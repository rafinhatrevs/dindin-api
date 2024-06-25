const config = require('./configs');

const { Pool } = require('pg');

const pool = new Pool({
    host: config.dbHost,
    port: config.dbPort,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbName
});

module.exports = pool;