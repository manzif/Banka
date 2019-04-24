import jwt from 'jsonwebtoken';
import myqueries from '../db/myqueries'
import db from '../db/index';

const Auth = {
	async verifyToken(req, res, next) {
		const token = req.headers.authorization;
		if (!token) {
			return res.status(401).send({
				status: 401,
				error: 'Unauthorized, No token provided'
			});
		}

		try {
			const user = await jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
			const { rows } = await db.query(myqueries.getOne, [user.id]);
			if (!rows[0]) {
				return res.status(400).send({
					status: 400,
					error: 'Token expired'
				});
			}
			req.user = user;
			next();
		} catch (error) {
			console.log(error);
			return res.status(400).send({
				status: 400,
				error: 'Invalid token'
			});
		}
	},

	generateToken(payload) {
		const token = jwt.sign(payload, process.env.JWT_SECRET);
		return token;
	},
}

export default Auth;