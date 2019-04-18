
import Validate from '../helpers/validate';
import  Arrays from '../arrays/arrays';

class Account{

    getAll(req,res){   
        res.status(200).json({ status: 200, data: Arrays.accounts });
    }

    getAccount (req, res) {
    const account = Arrays.accounts.find(user => user.id === parseInt(req.params.id));
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
        const findUser = Arrays.users.find(user => user.id === parseInt(account.user));
        if(!findUser){ return res.status(400).json({ status: 400, error:'please signup first'});
        }
        Arrays.accounts.push(account);
         const data = {
            id:account.id, 
            accountNumber: account.accountNumber,
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            type: account.type,
            openingBalance: account.balance
        }
        res.status(201).json({ status: 201, data: data });
    }
    activate(req,res){
        const account = Arrays.accounts.find(user => user.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        account.status = 'active';
        const data = {
            accountNumber: account.accountNumber,
            status: account.status
        }
        res.status(200).json({ status: 200, data: data});
    }
    deactivate(req,res){
        const account = Arrays.accounts.find(user => user.accountNumber === parseInt(req.params.account_number));
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
        const account = Arrays.accounts.find(user => user.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        Arrays.accounts.splice(Arrays.accounts.indexOf(account), 1);
        res.status(200).json({ status: 200, message: 'Account successfully deleted' });
    }
}


export default new Account();


     