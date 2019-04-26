import myqueries from '../db/myqueries';
import index from '../db/index';
import { stat } from 'fs';


const db = index.runQuery;


class AccountModels{

// get all account 

  async getAll(){
    // // const status = req.query.status;
    // // const query = myqueries.getAll + " WHERE status =' "+ status +"'";
    // // if(status){

    // }
     const getAll = await db.query(myqueries.getAll);
     return getAll;
  }

  async getOneAccount(id){
    const getOneAccount = await db.query(myqueries.getOneAccount, [id]);
    return getOneAccount;
 }

 //get account of the same user
async getAccountId(email){
    const getAccountId = await db.query(myqueries.getAccountId, [email]);
    return getAccountId;
}

// Get details of a single account

async getAccountDetails(account_number){
    const getAccountDetails = await db.query(myqueries.getAccountDetails, [account_number]);
    return getAccountDetails;
} 

// create account
async create1(owner){
    const create1 = await db.query(myqueries.getOne, [owner]);
    return create1;
}

async create2(values){
    const create2 = await db.query(myqueries.createAccount, values);
    return create2;
}

//delete an account

async delete1(account_number){
    const delete1 = await db.query(myqueries.getAccountNumber, [account_number]);
    return delete1;
}

async delete2(account_number){
    const delete2 = await db.query(myqueries.deleteAccount, [account_number]);
    return delete2;
}


// deactivate account

async deactivate1(account_number){
    const deactivate1 = await db.query(myqueries.getAccountNumber, [account_number])
    return deactivate1;
}
async deactivate2(value1){
    const deactivate2 = await db.query(myqueries.activate, value1);
    return deactivate2;
}


// activate account

async activate1(account_number){
    const activate1 = await db.query(myqueries.getAccountNumber, [account_number])
    return activate1;
}
async activate2(value1){
    const activate2 = await db.query(myqueries.activate, value1);
    return activate2;
}

// Get activate 

async getActiveAccount(status){
    const getActiveAccount = await db.query(myqueries.getActiveAccount, [status]);
    return getActiveAccount;
}


};


export default new AccountModels();

