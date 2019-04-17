
import Joi from 'joi';
import PasswordComplexity from 'joi-password-complexity'

class Validate{

    validateSignup(user) {
        const schema = {
            firstName:Joi.string().required() ,
            lastName:Joi.string().required(),
            password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/).required().options({language:{string:{regex:{base:'Your password is not Strong enough!!Try Again'}}}}),
            email: Joi.string().email({ minDomainAtoms: 2 }).required()
        };
        return Joi.validate(user, schema);
    }
    validateSignin(user) {
        const schema = {
            email: Joi.string().required(),
            password: Joi.string().required()
        };
        return Joi.validate(user, schema);
    }
    validateAccount(user) {
        const schema = {
            user: Joi.number().integer().required(),
            type: Joi.string().required(),
            email: Joi.string().email({ minDomainAtoms: 2 })
        };
        return Joi.validate(user, schema);
    }
    validateTransaction(user) {
        const schema = {
            accountNumber: Joi.number().integer().required(),
            cashier: Joi.number().integer().required(),
            amount: Joi.number().integer().required()
        };
        return Joi.validate(user, schema);
    }

}

export default new Validate();