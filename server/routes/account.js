import express from 'express';
import Account from '../controllers/account';

const router = express.Router();

router.get('/api/v1/accounts', Account.getAll);
router.post('/api/v1/accounts', Account.create);

export default router;