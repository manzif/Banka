import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const runQuery = {
  async query (query, parameter) {
    return await pool.query(query, parameter)
      .then((res) => res)
      .catch((err) => err);
  },
}
export default runQuery;
