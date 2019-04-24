import express from 'express';
import Account from '../controllers/account';
import auth  from '../middleware/authent';

const router = express.Router();

router.get('/api/v1/accounts', auth.verifyToken, Account.getAll);
router.post('/api/v1/accounts', Account.create);
// router.get('/api/v1/user/:email/accounts', Account.getAccountId);
 router.get('/api/v1/accounts/:status', auth.verifyToken, Account.getActiveAccount);
 router.get('/api/v1/accounts/:account_number', auth.verifyToken, Account.getAccountDetails);
 router.patch('/api/v1/accounts/:account_number/activate',auth.verifyToken, Account.activate);
 router.patch('/api/v1/accounts/:account_number/deactivate',auth.verifyToken, Account.deactivate);
 router.delete('/api/v1/accounts/:account_number',auth.verifyToken, Account.delete);

export default router;