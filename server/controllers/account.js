import Validate from '../helpers/validate';
import db from '../db/index';
import myqueries from '../db/myqueries';




class Account{

async getAll(req,res){
    const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
		}
    try {
        const { rows } = await db.query(myqueries.getAll);
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
        const { rows, rowCount } = await db.query(myqueries.getOneAccount, [req.params.id]);
        if(rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist Please check your id try Again!!' });
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
    const {rows, rowCount} = await db.query(myqueries.getAccountDetails, [req.params.account_number]);
    if(rowCount == 0)
    return res.status(400).json({ status: 400, error: 'Account does not exist Please check your account number try Again!!' });
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
        
        const { rows, rowCount } = await db.query(myqueries.getActiveAccount, [req.query.status]);
        if(rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist Please check your id try Again!!' });
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
           const user = await db.query(myqueries.getOne, [account.owner]);
           if(user.rowCount == 0){
            return res.status(400).json({ status: 400, error: 'Please signup first' });
           }
           const {rows} = await db.query(myqueries.createAccount, values);
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
    const values1 = ['active', req.params.account_number];

    try {
        const account = await db.query(myqueries.getAccountNumber, [req.params.account_number])
        if(account.rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist' });
        if(account.rows[0].status === 'active')
        return res.status(400).json({ status: 400, error: 'Account is already activated ' });
        const {rows} = await db.query(myqueries.activate, values1);
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
        const account = await db.query(myqueries.getAccountNumber, [req.params.account_number])
        if(account.rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist' });
        if(account.rows[0].status === 'dormant')
        return res.status(400).json({ status: 400, error: 'Account is already Deactivated ' });
        const {rows} = await db.query(myqueries.activate, values1);
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
        const account = await db.query(myqueries.getAccountNumber, [req.params.account_number])
        if(account.rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist' });
        const {rows} = await db.query(myqueries.deleteAccount, [req.params.account_number]);
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
        const {rows, rowCount } = await db.query(myqueries.getAccountId, [req.params.email]);
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


     