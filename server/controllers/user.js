
import Validate from '../helpers/validate';
import db from '../db/index';
import myqueries from '../db/myqueries';
import auth from '../middleware/authent';
import helper from '../helpers/password';


class User {


    async getAllUser(req, res){
        try {
            const { rows } = await db.query(myqueries.getAllUsers);
            return res.status(200).json({
                status: 200,
                data: rows,
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error
            })
        }
    }

async getUser(req,res){
    try {
        const {rows} = await db.query(myqueries.getOne, [parseInt(req.params.id)]);
        return res.status(200).json({
            status:200,
            data:rows
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            error
        })
    }
}

async signup(req, res){
    const result = Validate.validateSignup(req.body);
        if (result.error) {
            return res.status(400).json({ status: 400, error: result.error.details[0].message });
        }
        const user = {
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email.toLowerCase(),
                    password: req.body.password,
                    type: 'client'
        
                };
        const hash = helper.hashPasword(user.password);
        const values = [user.firstname, user.lastname, user.email, hash, user.type];
        try {
            const {rows} = await db.query(myqueries.signup, values);
            return res.status(200).json({
                status:200,
                data:rows
            })
        } catch (error) {
            return res.status(500).json({
                status:500,
                error
            })
        }

}

    async signin(req, res) {
        const values = [req.body.email.toLowerCase()]

        try {
            const user = await db.query(myqueries.signin, values);
            if (user.rowCount == 0) {
                return res.status(400).json({ status: 400, error: 'No account found' });
            }

            if (helper.comparePassword(req.body.password, user.rows[0].password)) {
                const payload = { id: user.rows[0].id, isAdmin: user.rows[0].is_admin, type: user.rows[0].type };
                console.log(payload)
                const token = auth.generateToken(payload);
                res.status(200).json({ status: 200, token, data: user.rows });
            }
            return res.status(400).json({
                status: 400,
                message: 'Incorrect username or password'
            });
        } catch (error) {
            console.log(error)
            return res.status(400).json({
                status: 400,
                error,
            });
        }
    }

}
export default new User();

