import express from 'express';
import { getTransactions, exportTransactionsToCSV, getTransactionStats } from '../controllers/transactionController';
import { protect } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', protect, getTransactions);
router.get('/export', protect, exportTransactionsToCSV);
router.get('/stats', protect, getTransactionStats);

export default router;