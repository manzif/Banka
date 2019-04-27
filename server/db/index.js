const Pool = require('pg').Pool;
const dotenv = require('dotenv');

dotenv.config();

const pool = process.env.NODE_ENV === 'test' ? new Pool({ connectionString: process.env.DATABASE_URL_TEST })
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
