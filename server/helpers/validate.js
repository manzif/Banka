
import Joi from 'joi';

class Validate{

    validateSignup(user) {
        const schema = {
            FirstName:Joi.string().required() ,
            LastName:Joi.string().required(),
            password: Joi.string().required(),
            email: Joi.string().required(),
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

}

export default new Validate();