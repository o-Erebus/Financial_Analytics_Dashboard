import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
    id: number;
    date: Date;
    amount: number;
    category: 'Revenue' | 'Expense';
    status: 'Paid' | 'Pending';
    user_id: string; // Corresponds to User's username for simplicity
    user_profile?: string;
}

const TransactionSchema: Schema = new Schema({
    id: { type: Number, required: true, unique: true },
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, enum: ['Revenue', 'Expense'], required: true },
    status: { type: String, enum: ['Paid', 'Pending'], required: true },
    user_id: { type: String, required: true, ref: 'User.username' }, // Assuming user_id refers to username
    user_profile: { type: String },
}, {
    timestamps: true,
});

// Index for frequently queried fields
TransactionSchema.index({ date: 1, category: 1, status: 1, user_id: 1, amount: 1 });
TransactionSchema.index({ "$**": "text" }); // For text search on all string fields

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);