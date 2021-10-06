const { Client } = require('pg');

const connection = new Client ({
  host: 'localhost',
  port: '5432',
  user: 'postgres',
  password: '654321',
  database: 'petshop',
});

module.exports = connection;