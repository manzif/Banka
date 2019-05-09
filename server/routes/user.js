import express from 'express';
import User from '../controllers/user';
import auth  from '../middleware/authent';

const router = express.Router();

router.get('/api/v1/users',auth.verifyToken, User.getAllUser);
router.get('/api/v1/users/:id', User.getUser);
router.delete('/api/v1/users/:id', auth.verifyToken, User.DeleteUser )
router.post('/api/v1/auth/signup', User.signup);
router.post('/api/v1/auth/signin', User.signin);

export default router;

