
import Validate from '../helpers/validate';



const users = [

    {id:1, email: 'manzif@gmail.com',  FirstName:'Manzi', LastName:'Fabrice',password:'password', Type: 'staff' , isAdmin:true },
    {id:2, email: 'mbabazifly@gmail.com', FirstName:'Fly', LastName:'Mbabazi', password:'password', Type: 'Client' , isAdmin:false },
    {id:3, email: 'irakozecarl@gmail.com', FirstName:'Carl', LastName:'Irakoze', password:'password', Type: 'Client', isAdmin:false },
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
            FirstName: req.body.FirstName,
            LastName: req.body.LastName ,
            password: req.body.password,
            Type: 'client',
            isAdmin: false
        };
        users.push(user);
        res.status(201).json({ status: 201, data: users });

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