
import Validate from '../helpers/validate';
import  Arrays from '../arrays/arrays';

class Account{


    getAllUser(req,res){
         
        res.status(200).json({ status: 200, data: Arrays.users});
    }


    signup(req,res){
        const result = Validate.validateSignup(req.body);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const user = {
            id : Arrays.users.length + 1,
            email: req.body.email ,
            firstName: req.body.firstName,
            lastName: req.body.lastName ,
            password: req.body.password,
            type: 'client',
            isAdmin: false
        };

        const findUser = Arrays.users.find(c => c.email === user.email);
        if(findUser){
            return res.status(400).json({ status: 400, error: "User already exist"});
        };
        Arrays.users.push(user);
        res.status(201).json({ status: 201, data: user });

    }
    signin(req,res){
        const user = {
            email: req.body.email,
            password:req.body.password
        };

        const result = Validate.validateSignin(user);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }

        const findUser = Arrays.users.find(c => c.email === req.body.email.toLowerCase() && c.password === req.body.password);

        if(!findUser){
            return res.status(404).json({ status: 404, error:'Incorrect email or password' });
        }
        res.status(200).json({ status: 200, data: findUser });
    }

    ///-----------------------------------------------------------------------------------



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
        const findAccount = Arrays.accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        const findCashier = cashiers.find(c => c.cashier === req.body.cashier);
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


    ///--------------------------------------------------------------------------------

    getAll(req,res){   
        res.status(200).json({ status: 200, data: Arrays.accounts });
    }

    getAccount (req, res) {
    const account = Arrays.accounts.find(c => c.id === parseInt(req.params.id));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        res.status(200).json({ status: 200, data: account });
    }

    create(req,res){
        const result = Validate.validateAccount(req.body);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
       
        const account = {
            id : Arrays.accounts.length + 1,
            accountNumber: Math.floor((Math.random() * 80000000)+10000000 ),
            createdOn: new Date(),
            user:req.body.user,
            type: req.body.type,
            status:'draft',
            balance: 0.0
        };
        const findUser = Arrays.users.find(c => c.id === parseInt(account.user));
        if(!findUser){ return res.status(400).json({ status: 400, error:'please signup first'});
        }
        Arrays.accounts.push(account);
         const data = {
            id:account.id, 
            accountNumber: account.accountNumber,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            type: account.type,
            OpeningBalance: account.balance
        }
        res.status(201).json({ status: 201, data: data });
    }
    activate(req,res){
        const account = Arrays.accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        account.status = 'active';
        const data = {
            accountNumber: account.accountNumber,
            status: account.status
        }
        res.status(200).json({ status: 200, data: data});
    }
    deactivate(req,res){
        const account = Arrays.accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        if(account.status !== 'active'){
            return res.status(400).json({ status: 400, error: 'Account is deactivated' });
        }
        account.status = 'Dormant';
        const data = {
            accountNumber: account.accountNumber,
            status: account.status
        }
        res.status(200).json({ status: 200, data: data});
    }
    delete(req,res){
        const account = Arrays.accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        Arrays.accounts.splice(Arrays.accounts.indexOf(account), 1);
        res.status(200).json({ status: 200, message: 'Account successfully deleted' });
    }
}


export default new Account();


     