import express from 'express';
import Transaction from '../controllers/transaction';

const router = express.Router();

router.get('/api/v1/transactions', Transaction.getAll);
router.post('/api/v1/transactions/:account_number/debit', Transaction.debit);
router.post('/api/v1/transactions/:account_number/credit', Transaction.credit);

export default router;