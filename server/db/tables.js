

const pool = require('./index')

const connect = async () => await pool.connect();

const createTables = async () => {
    const users = `CREATE TABLE IF NOT EXISTS
                        users(
                          id SERIAL NOT NULL PRIMARY KEY,
                          firstname VARCHAR(200) NOT NULL,
                          lastname VARCHAR(200) NOT NULL,
                          email VARCHAR(200) NOT NULL UNIQUE,
                          password VARCHAR(200) NOT NULL,
                          type VARCHAR(200) NOT NULL,
                          is_admin BOOLEAN NOT NULL DEFAULT false
                        )`;
    const accounts = `CREATE TABLE IF NOT EXISTS
                        accounts(
                          id SERIAL NOT NULL PRIMARY KEY,
                          accountnumber VARCHAR(200) NOT NULL,
                          createdon VARCHAR(200) NOT NULL,
                          owner INTEGER NOT NULL REFERENCES users(id),
                          type VARCHAR(200) NOT NULL,
                          status VARCHAR(200) NOT NULL,
                          balance VARCHAR(200) NOT NULL
                        )`;
    const transactions = `CREATE TABLE IF NOT EXISTS
                        transactions(
                          id SERIAL NOT NULL PRIMARY KEY,
                          createdon VARCHAR(200) NOT NULL,
                          type VARCHAR(200) NOT NULL,
                          accountnumber VARCHAR(200) NOT NULL,
                          cashier VARCHAR(200) NOT NULL,
                          amount VARCHAR(200) NOT NULL,
                          oldbalance VARCHAR(200) NOT NULL,
                          newbalance VARCHAR(200) NOT NULL
                        )`;
    const connection = await connect();
    await connection.query(users);
    await connection.query(accounts);
    await connection.query(transactions);
    console.log('All Tables created');
    connection.release();
  };
  
  

  const dropTables = async () => {
    const dropAlltables = 'DROP TABLE IF EXISTS users CASCADE';
  
    const connection = await connect();
    await connection.query(dropAlltables);
  
    console.log('All Tables droped');
    connection.release();
  };
  
  module.exports = {
    createTables,
    dropTables,
  };
  
  require('make-runnable');
  