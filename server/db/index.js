const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = process.env.NODE_ENV === 'test' ? new Pool({ 
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_TEST,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
 })
: new Pool({ connectionString: process.env.DATABASE_URL });

const runQuery = {
  async query(query, parameter) {
    return await pool.query(query, parameter)
      .then((res) => res)
      .catch((err) => err);
  },
}
module.exports = {
  pool: pool,
  runQuery: runQuery
};
