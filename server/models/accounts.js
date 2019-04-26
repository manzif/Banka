import myqueries from '../db/myqueries';
import db from '../db/index';
import { stat } from 'fs';


class AccountModels{

// get all account 

  async getAll(){
     const result = await db.query(myqueries.getAll);
     return result;
  }

  async getOneAccount(id){
    const result = await db.query(myqueries.getOneAccount, [id]);
    return result;
 }

 //get account of the same user
async getAccountId(email){
    const result = await db.query(myqueries.getAccountId, [email]);
    return result;
}

// Get details of a single account

async getAccountDetails(account_number){
    const result = await db.query(myqueries.getAccountDetails, [account_number]);
    return result;
} 

// create account
async AccountOwner(owner){
    const result = await db.query(myqueries.getOne, [owner]);
    return result;
}

async createAccount(values){
    const result = await db.query(myqueries.createAccount, values);
    return result;
}

//delete an account

async getAccountNumber(account_number){
    const result = await db.query(myqueries.getAccountNumber, [account_number]);
    return result;
}

async deleteAccount(account_number){
    const result = await db.query(myqueries.deleteAccount, [account_number]);
    return result;
}
// deactivate account

async deactivateAccount(values){
    const result = await db.query(myqueries.activate, values);
    return result;
}
// activate account

async activateAccount(values){
    const result = await db.query(myqueries.activate, values);
    return result;
}

// Get activate 

async getActiveAccount(active){
    const result = await db.query(myqueries.getActiveAccount, [active]);
    return result;
}
};

export default new AccountModels();

