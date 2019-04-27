import express from 'express';
import Transaction from '../controllers/transaction';
import auth  from '../middleware/authent';

const router = express.Router();

router.get('/api/v1/transactions', auth.verifyToken, Transaction.getAllTransaction);
router.get('/api/v1/accounts/:account_number/transactions', auth.verifyToken, Transaction.getOneTransaction);
router.get('/api/v1/transactions/:id', auth.verifyToken, Transaction.getOneTransactionId);
router.post('/api/v1/transactions/:account_number/debit',auth.verifyToken, Transaction.debit);
router.post('/api/v1/transactions/:account_number/credit',auth.verifyToken, Transaction.credit);

export default router;

