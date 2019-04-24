import Validate from '../helpers/validate';
import myqueries from '../db/myqueries';
import db from '../db/index';

class Transaction {

	async getAllTransaction(req, res) {
		const user = req.user;
		if(!user.isAdmin){
			return res.send({ message: 'You are not admin'});
		}
		try {
			const { rows } = await db.query(myqueries.getAllTransaction);
			return res.status(200).send({
				status: res.statusCode,
				data: rows,
			});
		} catch (error) {
			return res.status(500).json({
				status: 500,
				error
			})
		}
	}

async getOneTransaction(req, res){
	try {
		const {rows} = await db.query(myqueries.getOneTransaction, [req.params.account_number]);
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


	// getOneTransaction(req,res){     
	//     const query = myqueries.getOneTransaction;
	//     const values = [req.params.account_number];
	//     pool.connect((error, client, done) => {
	//         if (error) throw error;
	//         client.query(query, values, (err,result) => {
	//             done();
	//             if (err){
	//                return res.status(400).json({ status: 400, error: err.detail });
	//             }
	//             res.status(200).json({ status: 200, data: result.rows});
	//         });
	//     }); 
	// }
	// getOneTransactionId(req,res){     
	//     const query = myqueries.getOneTransactionId;
	//     const values = [req.params.id];
	//     pool.connect((error, client, done) => {
	//         if (error) throw error;
	//         client.query(query, values, (err,result) => {
	//             done();
	//             if (err){
	//                return res.status(400).json({ status: 400, error: err.detail });
	//             }
	//             res.status(200).json({ status: 200, data: result.rows});
	//         });
	//     }); 
	// }
	async debit(req, res) {
		const user = req.user;
		if(user.type != 'cashier'){
			return res.send({ message: 'You are not a cashier'});
		}
		
		const trans = {
			accountnumber: req.params.account_number,
			cashier: req.body.cashier,
			amount: req.body.amount
		};
		const result = Validate.validateTransaction(trans);
		if (result.error) {
			return res.status(400).json({ status: 400, error: result.error.details[0].message });
		}

		try {
			const account = await db.query(myqueries.getAccountNumber, [trans.accountnumber]);
			if (account.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Account requested is not available' });
			}
			const cashier = await db.query(myqueries.getCashier, [trans.cashier, 'cashier']);
			if (cashier.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Cashier not available!' });
			}

			if (parseInt(account.rows[0].balance) < trans.amount) {
				return res.status(400).json({ status: 400, error: 'You don\'t have that amount of money'});
			}
		
			const amount = parseInt(account.rows[0].balance) - trans.amount;
			const data = [new Date(), 'debit', trans.accountnumber, trans.cashier, trans.amount, account.rows[0].balance, amount];

			const transaction =await db.query(myqueries.createTransaction, data);
			if (transaction.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Failed to create transaction' });
			}
			await db.query(myqueries.updateBalance, [amount, trans.accountnumber]);
			res.status(200).json({ status: 200, data: transaction.rows });
		} catch (error) {
			return res.status(500).json({
				status: 500,
				error
			})
		}
	}
	async credit(req, res) {
		const user = req.user;
		if(user.type != 'cashier'){
			return res.send({ message: 'You are not a cashier'});
		}
		
		const trans = {
			accountnumber: req.params.account_number,
			cashier: req.body.cashier,
			amount: req.body.amount
		};
		const result = Validate.validateTransaction(trans);
		if (result.error) {
			return res.status(400).json({ status: 400, error: result.error.details[0].message });
		}

		try {
			const account = await db.query(myqueries.getAccountNumber, [trans.accountnumber]);
			if (account.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Account requested is not available' });
			}
			const cashier = await db.query(myqueries.getCashier, [trans.cashier, 'cashier']);
			if (cashier.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Cashier not available!' });
			}
		
			const amount = parseInt(account.rows[0].balance) + trans.amount;
			const data = [new Date(), 'debit', trans.accountnumber, trans.cashier, trans.amount, account.rows[0].balance, amount];

			const transaction =await db.query(myqueries.createTransaction, data);
			if (transaction.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Failed to create transaction' });
			}
			await db.query(myqueries.updateBalance, [amount, trans.accountnumber]);
			res.status(200).json({ status: 200, data: transaction.rows });
		} catch (error) {
			return res.status(500).json({
				status: 500,
				error
			})
		}
	}
}

export default new Transaction();