import myqueries from '../db/myqueries';
import db from '../db/index';

class TransactionModels{

    //get all transaction
async getAllTransaction(){
    const getAllTransaction =  await db.query(myqueries.getAllTransaction);
    return getAllTransaction;
}

// get  transactions of one account

async getOneTransaction(account_number){
    
    const getOneTransaction = db.query(myqueries.getOneTransaction, [account_number]);
    return getOneTransaction;
}


// get one transaction

async getOneTransactionId(id){
    const getOneTransactionId = await db.query(myqueries.getOneTransactionId, [id]);
    return getOneTransactionId;
}

// debit transaction

async debit1(value6){
    const debit1 = await db.query(myqueries.getAccountNumber, [value6]);
    return debit1;
}

async debit2(data){
    const debit2 = await db.query(myqueries.createTransaction, data);
    return debit2;
}
async debit3(value7){
    const debit3 = await db.query(myqueries.updateBalance, [value7]);
    return debit3;
}

/// credit
async credit1(value6){
    const credit1 = await db.query(myqueries.getAccountNumber, [value6]);
    return credit1;
}

async credit2(data){
    const credit2 = await db.query(myqueries.createTransaction, data);
    return credit2;
}
async credit3(value7){
    const credit3 = await db.query(myqueries.updateBalance, [value7]);
    return credit3;
}


}

export default new TransactionModels();

