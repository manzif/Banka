import Validate from '../helpers/validate';

const accounts = [

    {id:1, accountNumber: 23456546, createdOn:2019/9/12, user:1, Type: 'saving', status: 'draft', balance:12000},
    {id:2, accountNumber: 23454566, createdOn:2019/7/12, user:2, Type: 'current', status: 'active', balance:40000},
    {id:3, accountNumber: 23412346, createdOn:2019/2/12, user:3, Type: 'saving', status: 'draft', balance:23000},  
]
const users = [

    {id:1, email: 'manzif@gmail.com',  FirstName:'Manzi', LastName:'Fabrice',password:'password', Type: 'staff' , isAdmin:true },
    {id:2, email: 'mbabazifly@gmail.com', FirstName:'Fly', LastName:'Mbabazi', password:'password', Type: 'Cashier' , isAdmin:false },
    {id:3, email: 'irakozecarl@gmail.com', FirstName:'Carl', LastName:'Irakoze', password:'password', Type: 'Client', isAdmin:false },
];

const transactions = [
    {id:1, createdOn:2019/9/12, accountNumber: 23412346,  cashier:2, amount:23000, oldBalance: 23000, newBalance: 26000 },
    {id:2, createdOn:2019/9/12, accountNumber: 23454566,  cashier:2, amount:20000, oldBalance: 40000, newBalance: 20000 },
    {id:3, createdOn:2019/9/12, accountNumber: 23412346,  cashier:2, amount:20000, oldBalance: 120000, newBalance: 100000 },
];




class Transaction{

    getAll(req,res){
         
        res.status(200).json({ status: 200, data: transactions });
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

        const findAccount = accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        const findCashier = users.find(c => c.id === req.body.cashier && c.Type === 'Cashier');
        if (!findAccount){
            return res.status(400).json({ status: 400, error: 'Account not found' });
        }
        if (!findCashier){
            return res.status(400).json({ status: 400, error: 'Cashier not found' });
        }
        const transaction = {
            id: transactions.length + 1,
            createdOn: new Date(),
            accountNumber: parseInt(req.params.account_number),
            cashier: req.body.cashier,
            amount: req.body.amount,
            oldBalance: findAccount.balance,
            newBalance: findAccount.balance + req.body.amount
        }
        transactions.push(transaction);

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

        const findAccount = accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        const findCashier = users.find(c => c.id === req.body.cashier && c.Type === 'Cashier');
        if (!findAccount){
            return res.status(400).json({ status: 400, error: 'Account not found' });
        }
        if (!findCashier){
            return res.status(400).json({ status: 400, error: 'Cashier not found' });
        }
        if(findAccount.balance < trans.amount){
            return res.status(400).json({ status: 400, error: 'You don\'t have that certain amount of money'});
        }
        const transaction = {
            id: transactions.length + 1,
            createdOn: new Date(),
            accountNumber: parseInt(req.params.account_number),
            cashier: req.body.cashier,
            amount: req.body.amount,
            oldBalance: findAccount.balance,
            newBalance: findAccount.balance - req.body.amount
        }
        transactions.push(transaction);

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