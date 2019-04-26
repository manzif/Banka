import Validate from '../helpers/validate';
import index from '../db/index';
import myqueries from '../db/myqueries';
import AccountModels from '../models/accounts';
import { stat } from 'fs';

const db = index.runQuery;


class Account{

async getAll(req,res){
    
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
		}
    try {
        const  {rows}  = await AccountModels.getAll();
        return res.status(200).json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error
        })
    }
}

async getOneAccount(req,res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
		}
    try {
        const id = parseInt(req.params.id) ;
        const {rows, rowCount}= await AccountModels.getOneAccount(id);

        if(rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist Please check your id and try Again!!' });
        return res.status(200).json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error
        })
    }
}

async getAccountDetails(req, res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
		}
try {
    const value = parseInt(req.params.account_number);
    const {rows, rowCount} = await AccountModels.getAccountDetails(value);
    if(rowCount == 0)
    return res.status(400).json({ status: 400, error: 'Account requested is not available Please check the account number and try Again!!' });
    return res.status(200).send({
        status: 200,
        data:rows,
    })
} catch (error) {
    return res.status(500).json({
        status:500,
        error
    })
}
}

async getActiveAccount(req,res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
        }

    try {
        const status = 'active'
        const  {rows} = await AccountModels.getActiveAccount(status);
        return res.status(200).json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error
        })
    }
}
async getDormantAccount(req,res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
        }

    try {
        const status = 'draft'
        const  {rows} = await AccountModels.getActiveAccount(status);
        return res.status(200).json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error
        })
    }
}
async getDraftAccount(req,res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
        }

    try {
        const status = 'dormant'
        const  {rows} = await AccountModels.getActiveAccount(status);
        return res.status(200).json({
            status: 200,
            data: rows,
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error
        })
    }
}

async create (req, res){
    const result = Validate.validateAccount(req.body);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const account = {
                    accountnumber: Math.floor((Math.random() * 80000000)+10000000 ),
                    createdon: new Date(),
                    owner:req.body.owner,
                    type: req.body.type,
                    status:'draft',
                    balance: 0.0
                };
       const values =[account.accountnumber, account.createdon, account.owner, account.type, account.status, account.balance]

       try {
           const user = await AccountModels.create1(account.owner);
           if(user.rowCount == 0){
            return res.status(400).json({ status: 400, error: 'Please signup first' });
           }
           const {rows} = await AccountModels.create2(values);
           return res.status(200).json({
               status:200,
               data:rows
           })
       } catch (error) {
           return res.status(500).json({
               status:500,
               error
           })
       }
}
async activate(req,res){
    const user = req.user;
		if(!user.isAdmin){
			return res.send({ message: 'You are not admin'});
		}
    

    try {
        const values1 = ['active', parseInt(req.params.account_number)];
        const value5 = req.params.account_number;
        const account = await AccountModels.activate1(value5)
        if(account.rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist' });
        if(account.rows[0].status === 'active')
        return res.status(400).json({ status: 400, error: 'Account is already activated ' });
        const {rows} = await AccountModels.activate2(values1)
        return res.status(200).json({
            status:200,
            data:rows
        })
    } catch (error) {
       return res.status(500).json({
           status:500,
           error
       }) 
    }
}

async deactivate(req, res){

    const user = req.user;
		if(!user.isAdmin){
			return res.send({ message: 'You are not admin'});
		}
    const values1 = ['dormant', req.params.account_number];

    try {
        const value5 = req.params.account_number;
        const account = await AccountModels.deactivate1(value5);
        if(account.rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist' });
        if(account.rows[0].status === 'dormant')
        return res.status(400).json({ status: 400, error: 'Account is already Deactivated ' });
        const {rows} = await AccountModels.deactivate2(values1);
        return res.status(200).json({
            status:200,
            data:rows
        })
    } catch (error) {
       return res.status(500).json({
           status:500,
           error
       }) 
    }
}

async delete(req, res){
    const user = req.user;
		if(!user.isAdmin){
			return res.send({ message: 'You are not admin'});
		}
    try {
        const value = req.params.account_number;
        const account = await AccountModels.delete1(value);
        if(account.rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist' });
        const {rows} = await AccountModels.delete2(value);
        return res.status(200).json({
            status:200,
            message:'Account successfuly deleted'
        })
    } catch (error) {
       return res.status(500).json({
           status:500,
           error
       }) 
    }
}
async getAccountId(req, res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
		}
	try{
        const email = req.params.email;
        const {rows, rowCount } = await AccountModels.getAccountId(email);

        if(rowCount == 0)
        return res.status(400).json({ status: 400, error: 'User does not exist Please try Again' });
		return res.status(200).json({
			status: 200,
			data: rows
		})
	} catch (error) {
		return res.status(500).json({
			status:500,
			error
		})
    }
}	
}


export default new Account();


     