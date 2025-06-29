import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface for the static methods (if any, not used here but good practice)
export interface IUserModel extends Model<IUser> {
    // Example: findByUsername(username: string): Promise<IUser | null>;
}

// Interface for the instance methods
export interface IUserMethods {
    matchPassword(enteredPassword?: string): Promise<boolean>;
}

// Combine with Document and your custom fields
export interface IUser extends Document, IUserMethods {
    username: string;
    password?: string;
    user_profile?: string;
}

const UserSchema: Schema<IUser, IUserModel, IUserMethods> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false, // Do not return password by default
    },
    user_profile: { type: String },
}, {
    timestamps: true,
});

// Hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
UserSchema.methods.matchPassword = async function (enteredPassword?: string): Promise<boolean> {
    // 'this' refers to the document instance
    // The password field on 'this' is the hashed password from the DB
    // It's available here because we used .select('+password') in the controller
    if (!this.password || !enteredPassword) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model<IUser, IUserModel>('User', UserSchema);