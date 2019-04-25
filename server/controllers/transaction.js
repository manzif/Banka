import Validate from '../helpers/validate';
import myqueries from '../db/myqueries';
import db from '../db/index';

class Transaction {

	async getAllTransaction(req, res) {
		const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
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
		const {rows, rowCount} = await db.query(myqueries.getOneTransaction, [req.params.account_number]);
		if(rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Account does not exist or have done it any transaction Please check Account Number and try Again!!' });
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

async getOneTransactionId(req, res){
	try {
		const {rows, rowCount} = await db.query(myqueries.getOneTransactionId, [req.params.id]);
		if(rowCount == 0)
        return res.status(400).json({ status: 400, error: 'Transaction does not exist Please check the id and try Again!!' });
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


