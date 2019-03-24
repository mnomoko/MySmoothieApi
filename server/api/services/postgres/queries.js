// import './../../../common/env';

const Pool = require('pg').Pool;

// console.log(JSON.stringify(process.env));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME || process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: true,
});

export default pool;
