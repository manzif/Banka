
import Validate from '../helpers/validate';

const accounts = [

    {id:1, accountNumber: 23456546, createdOn:2019/9/12, user:1, type: 'saving', status: 'draft', balance:234789789},
    {id:2, accountNumber: 23454566, createdOn:2019/7/12, user:2, type: 'current', status: 'active', balance:78855789},
    {id:3, accountNumber: 23412346, createdOn:2019/2/12, user:3, type: 'saving', status: 'draft', balance:2374567},  
]
const users = [

    {id:1, email: 'manzif@gmail.com',  firstName:'Manzi', lastName:'Fabrice',password:'password', type: 'staff' , isAdmin:true },
    {id:2, email: 'mbabazifly@gmail.com', firstName:'Fly', lastName:'Mbabazi', password:'password', type: 'Client' , isAdmin:false },
    {id:3, email: 'irakozecarl@gmail.com', firstName:'Carl', lastName:'Irakoze', password:'password', type: 'Client', isAdmin:false },
];

class Account{

    getAll(req,res){   
        res.status(200).json({ status: 200, data: accounts });
    }

    getAccount (req, res) {
    const account = accounts.find(c => c.id === parseInt(req.params.id));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        res.status(200).json({ status: 200, data: account });
    }

    create(req,res){
        const result = Validate.validateAccount(req.body);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const account = {
            id : accounts.length + 1,
            accountNumber: Math.floor((Math.random() * 80000000)+10000000 ),
            createdOn: new Date(),
            user:req.body.user,
            type: req.body.type,
            status:'draft',
            balance: 0.0
        };
        accounts.push(account);
         //const findUser = users.find(c => c.email === account.email);
         const findId = users.find(c => c.id === account.user);
         if(!findId){
            return res.status(400).json({ status: 400, error:'please signup first'});
         }
         /*else if(findId){
            return res.status(400).json({ status: 400, error:'This Id already have an account'});
         }*/
         const data = {
            id:account.id, 
            accountNumber: account.accountNumber,
            firstName: findId.firstName,
            lastName: findId.lastName,
            type: account.type,
            OpeningBalance: account.balance
         }
        res.status(201).json({ status: 201, data: data });
    }
    activate(req,res){
        const account = accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        account.status = 'active';
        const data = {
            accountNumber: account.accountNumber,
            status: account.status
        }
        res.status(200).json({ status: 200, data: data});
    }
    deactivate(req,res){
        const account = accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
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
        const account = accounts.find(c => c.accountNumber === parseInt(req.params.account_number));
        if(!account) return res.status(400).json({ status: 400, error: 'Account requested is not available' });
        accounts.splice(accounts.indexOf(account), 1);
        res.status(200).json({ status: 200, message: 'Account successfully deleted' });
    }
}


export default new Account();


     