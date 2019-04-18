import express from 'express';
import Transaction from '../controllers/account';

const router = express.Router();

router.get('/api/v1/transactions', Transaction.getAllTransaction);
router.post('/api/v1/transactions/:account_number/debit', Transaction.debit);
router.post('/api/v1/transactions/:account_number/credit', Transaction.credit);

export default router;