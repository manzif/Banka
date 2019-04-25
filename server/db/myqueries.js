const signup = 'INSERT INTO users(firstname, lastname, email,password, type) VALUES($1, $2, $3, $4, $5) RETURNING *';
const signin = 'SELECT * FROM users WHERE email = $1';
const getAllUsers = 'SELECT * FROM users';
const getOne = 'SELECT * FROM users WHERE id = $1';
const getEmail = 'SELECT * FROM users WHERE email = $1';
const deleteUser = 'DELETE FROM users WHERE id = $1 RETURNING *';


const getAccountNumber = 'SELECT * FROM accounts WHERE accountnumber = $1';
const getAccountId = 'SELECT accounts.* FROM accounts,users WHERE accounts.owner = users.id AND users.email= $1';
const getAccountDetails = 'SELECT * FROM accounts WHERE accountnumber = $1';
const getActiveAccount = 'SELECT * FROM accounts WHERE status = "active" ';
const getOneAccount = 'SELECT * FROM accounts WHERE id = $1';

const activate = 'UPDATE accounts SET status = $1 WHERE accountnumber = $2 RETURNING *';
const deleteAccount = 'DELETE FROM accounts WHERE accountnumber = $1 RETURNING *';

const getCashier = 'SELECT * FROM users WHERE id = $1 AND type = $2';
const getAll = 'SELECT * FROM accounts';
const updateBalance = 'UPDATE accounts SET balance = $1 WHERE accountnumber = $2 RETURNING *'
const getAllTransaction = 'SELECT * FROM transactions';
const createAccount = 'INSERT INTO accounts(accountnumber, createdon, owner, type, status, balance) VALUES($1, $2, $3, $4, $5, $6)  RETURNING *';
const createTransaction = 'INSERT INTO transactions(createdon, type, accountnumber, cashier, amount, oldbalance, newbalance) VALUES($1, $2, $3, $4, $5, $6, $7)  RETURNING *';
const getOneTransaction = 'SELECT * FROM transactions WHERE accountnumber = $1';
const getOneTransactionId = 'SELECT * FROM transactions WHERE id = $1';

export default  {
 //User queries   
 signup,
 getAllUsers,
 getOne,
 signin,
 deleteUser,
 //Account queries
 getAll,
 createAccount,
 getAccountNumber,
 activate,
 deleteAccount,
 getActiveAccount,
 getAccountDetails,
 getAccountId,
 getEmail,
 getOneAccount,
 

 //transactions queries
 getAllTransaction,
 createTransaction,
 getCashier,
 updateBalance,
 getOneTransaction,
 getOneTransactionId
 
}