import { Request, Response, NextFunction } from 'express';
import Transaction, { ITransaction } from '../models/Transaction';
import { Parser } from 'json2csv';
import { PipelineStage } from 'mongoose';
// @desc    Get all transactions with filtering, sorting, pagination, and search
// @route   GET /api/transactions
// @access  Private
export const getTransactions = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            page = 1,
            limit = 10,
            sortBy = 'date',
            sortOrder = 'desc',
            search, // General text search
            category,
            status,
            user_id,
            startDate, // Date format: YYYY-MM-DD
            endDate,   // Date format: YYYY-MM-DD
            minAmount,
            maxAmount
        } = req.query;

        const query: any = {};

        if (search) {
            query.$text = { $search: search as string };
        }
        if (category) query.category = category as string;
        if (status) query.status = status as string;
        if (user_id) query.user_id = user_id as string;

        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate as string);
            if (endDate) {
                const end = new Date(endDate as string);
                end.setDate(end.getDate() + 1); // To include the whole end day
                query.date.$lt = end;
            }
        }

        if (minAmount || maxAmount) {
            query.amount = {};
            if (minAmount) query.amount.$gte = parseFloat(minAmount as string);
            if (maxAmount) query.amount.$lte = parseFloat(maxAmount as string);
        }


        const sortOptions: any = {};
        sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

        const transactions = await Transaction.find(query)
            .sort(sortOptions)
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .lean();

        const totalTransactions = await Transaction.countDocuments(query);

        res.json({
            transactions,
            currentPage: Number(page),
            totalPages: Math.ceil(totalTransactions / Number(limit)),
            totalTransactions,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Export transactions to CSV
// @route   GET /api/transactions/export
// @access  Private
export const exportTransactionsToCSV = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            fields,
            sortBy = 'date',
            sortOrder = 'desc',
            search,
            category,
            status,
            user_id,
            startDate,
            endDate,
            minAmount,
            maxAmount
        } = req.query;

        const query: any = {};
        if (search) query.$text = { $search: search as string };
        if (category) query.category = category as string;
        if (status) query.status = status as string;
        if (user_id) query.user_id = user_id as string;
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate as string);
            if (endDate) {
                const end = new Date(endDate as string);
                end.setDate(end.getDate() + 1);
                query.date.$lt = end;
            }
        }
        if (minAmount || maxAmount) {
            query.amount = {};
            if (minAmount) query.amount.$gte = parseFloat(minAmount as string);
            if (maxAmount) query.amount.$lte = parseFloat(maxAmount as string);
        }

        const sortOptions: any = {};
        sortOptions[sortBy as string] = sortOrder === 'asc' ? 1 : -1;

        const transactions = await Transaction.find(query).sort(sortOptions).lean();

        if (transactions.length === 0) {
            res.status(404);
            return next(new Error('No transactions found to export for the given criteria.'));
        }

        let selectedFields = ['id', 'date', 'amount', 'category', 'status', 'user_id', 'user_profile'];
        if (typeof fields === 'string' && fields.length > 0) {
            selectedFields = fields.split(',');
        }


        const json2csvParser = new Parser({ fields: selectedFields });
        const csv = json2csvParser.parse(transactions);

        res.header('Content-Type', 'text/csv');
        res.attachment('transactions.csv');
        res.send(csv);

    } catch (error) {
        next(error);
    }
};

// @desc    Get transaction statistics
// @route   GET /api/transactions/stats
// @access  Private
// src/controllers/transactionController.ts
// ... (imports)

export const getTransactionStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user_id, startDate, endDate } = req.query;

        const matchQuery: any = {};
        if (user_id) matchQuery.user_id = user_id as string;

        // MODIFIED: Use BSON type number 9 for Date
        const dateTypeMatch = { date: { $exists: true, $type: 9 as 9, $ne: null } };

        if (startDate || endDate) {
            // Ensure matchQuery.date is initialized correctly if it doesn't exist
            if (!matchQuery.date) matchQuery.date = {};

            // Merge with dateTypeMatch properties, careful not to overwrite $type
            Object.assign(matchQuery.date, dateTypeMatch.date);

            if (startDate) (matchQuery.date as any).$gte = new Date(startDate as string);
            if (endDate) {
                const end = new Date(endDate as string);
                end.setDate(end.getDate() + 1);
                (matchQuery.date as any).$lt = end;
            }
        }


        // A more robust way to build the match for aggregations:
        const buildAggregationMatch = (specificCriteria: any) => {
            const baseMatch = { ...matchQuery };
            if (!baseMatch.date) { // If no date range in query, apply the base date type check
                baseMatch.date = { ...dateTypeMatch.date };
            } else { // Date range was in query, ensure $type and other conditions are there
                Object.assign(baseMatch.date, { $type: 9 as 9, $exists: true, $ne: null });
            }
            return { ...baseMatch, ...specificCriteria };
        };

        const totalRevenue = await Transaction.aggregate([
            { $match: buildAggregationMatch({ category: 'Revenue', status: 'Paid' }) },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        const totalExpenses = await Transaction.aggregate([
            { $match: buildAggregationMatch({ category: 'Expense', status: 'Paid' }) },
            { $group: { _id: null, total: { $sum: '$amount' } } },
        ]);
        const categoryBreakdown = await Transaction.aggregate([
            { $match: buildAggregationMatch({ status: 'Paid' }) },
            { $group: { _id: '$category', total: { $sum: '$amount' } } },
            { $project: { category: '$_id', total: 1, _id: 0 } }
        ]);
        const revenueVsExpensesTrend = await Transaction.aggregate([
            { $match: buildAggregationMatch({ status: 'Paid' }) },
            // ... rest of revenueVsExpensesTrend pipeline
            { $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" }, category: "$category" as "$category" }, totalAmount: { $sum: '$amount' }}},
            { $project: { _id: 0, year: "$_id.year", month: "$_id.month", category: "$_id.category", totalAmount: "$totalAmount" } },
            { $sort: { year: 1 as const, month: 1 as const, category: 1 as const } }
        ]);


        res.json({
            totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
            totalExpenses: totalExpenses.length > 0 ? totalExpenses[0].total : 0,
            netProfit: (totalRevenue.length > 0 ? totalRevenue[0].total : 0) - (totalExpenses.length > 0 ? totalExpenses[0].total : 0),
            categoryBreakdown,
            revenueVsExpensesTrend
        });
    } catch (error) {
        next(error);
    }
};

