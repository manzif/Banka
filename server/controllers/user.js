
import Validate from '../helpers/validate';



const users = [

    {id:1, email: 'manzif@gmail.com',  firstName:'Manzi', lastName:'Fabrice',password:'password', type: 'staff' , isAdmin:true },
    {id:2, email: 'mbabazifly@gmail.com', firstName:'Fly', lastName:'Mbabazi', password:'password', type: 'Client' , isAdmin:false },
    {id:3, email: 'irakozecarl@gmail.com', firstName:'Carl', lastName:'Irakoze', password:'password', type: 'Client', isAdmin:false },
];



class User{

      getAll(req,res){
         
        res.status(200).json({ status: 200, data: users });
    }


    signup(req,res){
        const result = Validate.validateSignup(req.body);
        if(result.error){
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const user = {
            id : users.length + 1,
            email: req.body.email ,
            firstName: req.body.firstName,
            lastName: req.body.lastName ,
            password: req.body.password,
            type: 'client',
            isAdmin: false
        };

        const findUser = users.find(c => c.email === user.email);
        if(findUser){
            return res.status(400).json({ status: 400, error: "User already exist"});
        };
        users.push(user);
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

        const findUser = users.find(c => c.email === user.email && c.password === user.password);

        if(!findUser){
            return res.status(404).json({ status: 404, error:'Incorrect email or password' });
        }
        res.status(200).json({ status: 200, data: findUser });
    }
}

export default new User();