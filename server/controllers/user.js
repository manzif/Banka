
import Validate from '../helpers/validate';

import Arrays from '../arrays/arrays';


class User{

      getAll(req,res){
         
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

        const findUser = Arrays.users.find(c => c.email === req.body.email && c.password === req.body.password);

        if(!findUser){
            return res.status(404).json({ status: 404, error:'Incorrect email or password' });
        }
        res.status(200).json({ status: 200, data: findUser });
    }
}

export default new User();