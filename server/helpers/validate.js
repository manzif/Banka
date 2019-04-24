
import Joi from 'joi';

class Validate{

    validateSignup(user) {
        const schema = {
            firstname:Joi.string().regex(/^\S+$/).required().options({language:{string:{regex:{base:'Please remove spaces and try again!!'}}}}),
            lastname:Joi.string().regex(/^\S+$/).required().options({language:{string:{regex:{base:'Please remove spaces and try again!!'}}}}),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({language:{string:{regex:{base:'Your password is not Strong!!Try Again with 1 upper case , 1 lower case and a number'}}}}),
            email: Joi.string().email().insensitive().required()
        };
        return Joi.validate(user, schema);
    }
    validateSignin(user) {
        const schema = {
            email: Joi.string().email().insensitive().required(),
            password: Joi.string().required()
        };
        return Joi.validate(user, schema);
    }
    validateAccount(user) {
        const schema = {
            owner: Joi.number().integer().required(),
            type: Joi.string().required()
        };
        return Joi.validate(user, schema);
    }
    validateTransaction(user) {
        const schema = {
            accountnumber: Joi.number().integer().required(),
            cashier: Joi.number().integer().required(),
            amount: Joi.number().integer().required()
        };
        return Joi.validate(user, schema);
    }

}

export default new Validate();