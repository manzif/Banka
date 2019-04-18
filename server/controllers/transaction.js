import Validate from '../helpers/validate';
import Arrays from '../arrays/arrays';


class Transaction{

    getAllTransaction(req,res){     
        res.status(200).json({ status: 200, data: Arrays.transactions });
    }

     debit(req,res){
        const trans = {
            accountNumber: req.params.account_number,
            cashier: req.body.cashier,
            amount: req.body.amount
        };
        const result = Validate.validateTransaction(trans);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const cashiers =[{cashier:1, names: 'Felix' }, {cashier:2, names: 'Niyo' }];
        const findAccount = Arrays.accounts.find(user => user.accountNumber === parseInt(req.params.account_number));
        const findCashier = cashiers.find(user => user.cashier === req.body.cashier);
        if (!findAccount){
            return res.status(400).json({ status: 404, error: 'Account not found' });
        }
        if (!findCashier){
            return res.status(400).json({ status: 404, error: 'Cashier not found' });
        }
        if(findAccount.balance < trans.amount){
            return res.status(400).json({ status: 400, error: 'You don\'t have that certain amount of money'});
        }
        const transaction = {
            id: Arrays.transactions.length + 1,
            createdOn: new Date(),
            accountNumber: parseInt(req.params.account_number),
            cashier: req.body.cashier,
            amount: req.body.amount,
            oldBalance: findAccount.balance,
            newBalance: findAccount.balance - req.body.amount
        }
        Arrays.transactions.push(transaction);
        findAccount.balance = transaction.newBalance;

        const data = {
            transactionId: transaction.id,
            accountNumber: transaction.accountNumber,
            amount: transaction.amount,
            cashier: transaction.cashier,
            transactionType: 'Debit',
            accountBalance: transaction.newBalance
        }
        
        res.status(201).json({ status: 201, data: data });
    }
    credit(req,res){
        const trans = {
            accountNumber: req.params.account_number,
            cashier: req.body.cashier,
            amount: req.body.amount
        };
        const result = Validate.validateTransaction(trans);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const cashiers =[{cashier:1, names: 'Felix' }, {cashier:2, names: 'Niyo' }];
        const findAccount = Arrays.accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        const findCashier = cashiers.find(c => c.cashier === req.body.cashier);
        if (!findAccount){
            return res.status(400).json({ status: 400, error: 'Account not found' });
        }
        if (!findCashier){
            return res.status(400).json({ status: 400, error: 'Cashier not found' });
        }
        
        const transaction = {
            id: Arrays.transactions.length + 1,
            createdOn: new Date(),
            accountNumber: parseInt(req.params.account_number),
            cashier: req.body.cashier,
            amount: req.body.amount,
            oldBalance: findAccount.balance,
            newBalance: findAccount.balance + req.body.amount
        }
        Arrays.transactions.push(transaction);
        findAccount.balance = transaction.newBalance;

        const data = {
            transactionId: transaction.id,
            accountNumber: transaction.accountNumber,
            amount: transaction.amount,
            cashier: transaction.cashier,
            transactionType: 'credit',
            accountBalance: transaction.newBalance
        }
        
        res.status(201).json({ status: 201, data: data });
    }    
}

export default new Transaction();