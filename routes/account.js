import express from 'express';
import Account from '../controllers/account';

const router = express.Router();

router.get('/api/v1/accounts', Account.getAll);
router.post('/api/v1/accounts', Account.create);
router.patch('/api/v1/accounts/:account_number/activate', Account.activate);
router.patch('/api/v1/accounts/:account_number/deactivate', Account.deactivate);
router.delete('/api/v1/accounts/:account_number', Account.delete);

export default router;