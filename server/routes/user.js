import express from 'express';
import User from '../controllers/user';

const router = express.Router();

router.post('/api/v1/auth/signup', User.signup);
router.post('/api/v1/auth/signin', User.signin);

export default router;