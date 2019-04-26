import myqueries from '../db/myqueries';
import db from '../db/index';

class TransactionModels{

    //get all transaction
async getAllTransaction(){
    const result =  await db.query(myqueries.getAllTransaction);
    return result;
}

// get  transactions of one account

async getOneTransaction(account_number){
    
    const result = db.query(myqueries.getOneTransaction, [account_number]);
    return result;
}
// get one transaction

async getOneTransactionId(id){
    const result = await db.query(myqueries.getOneTransactionId, [id]);
    return result;
}
// debit transaction

async getAccountNumber(accountnumber){
    const result = await db.query(myqueries.getAccountNumber, [accountnumber]);
    return result;
}

async createTransaction(data){
    const result = await db.query(myqueries.createTransaction, data);
    return result;
}
async updateBalance(balance){
    const result = await db.query(myqueries.updateBalance, [balance]);
    return result;
}
}

export default new TransactionModels();

