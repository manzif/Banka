import Validate from '../helpers/validate';
import myqueries from '../db/myqueries';
import index from '../db/index';
import TransactionModels from '../models/transaction';

const db = index.runQuery;

class Transaction {

	async getAllTransaction(req, res) {
		const user = req.user;
		if(user.type == 'client'){
			return res.send({ message: 'You are not admin or a cashier'});
		}
		try {
			const { rows } = await TransactionModels.getAllTransaction();
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
		const values = parseInt(req.params.account_number)
		const {rows, rowCount} = await TransactionModels.getOneTransaction(values);
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
		const value = parseInt(req.params.id);
		const {rows, rowCount} = await TransactionModels.getOneTransactionId(value);
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
			const value6 = trans.accountnumber
			const account = await TransactionModels.debit1(value6);
			if (account.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Account requested is not available' });
			}
			if (parseInt(account.rows[0].balance) < trans.amount) {
				return res.status(400).json({ status: 400, error: 'You don\'t have that amount of money'});
			}
		
			const amount = parseInt(account.rows[0].balance) - trans.amount;
			const data = [new Date(), 'debit', trans.accountnumber, trans.cashier, trans.amount, account.rows[0].balance, amount];

			const transaction = await TransactionModels.debit2(data);
			if (transaction.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Failed to create transaction' });
			}
			const value7 = [amount, trans.accountnumber];
			await TransactionModels.debit3(value7)
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
			const value6 = trans.accountnumber
			const account = await TransactionModels.credit1(value6)
			if (account.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Account requested is not available' });
			}
		
			const amount = parseInt(account.rows[0].balance) + trans.amount;
			const data = [new Date(), 'debit', trans.accountnumber, trans.cashier, trans.amount, account.rows[0].balance, amount];

			const transaction =await TransactionModels.credit2(data)
			if (transaction.rowCount == 0) {
				return res.status(400).json({ status: 400, error: 'Failed to create transaction' });
			}
			const value7 = [amount, trans.accountnumber];
			await TransactionModels.credit3(value7)
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


