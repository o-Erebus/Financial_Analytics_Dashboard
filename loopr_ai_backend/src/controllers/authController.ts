import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import jwt, { SignOptions } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

const generateToken = (userId: string): string => {
    const payload = { id: userId };
    const options: SignOptions = {
        expiresIn: JWT_EXPIRES_IN as any,
    };
    return jwt.sign(payload, JWT_SECRET, options);
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400);
        return next(new Error('Please provide username and password'));
    }

    try {
        const user = await User.findOne({ username }).select('+password');

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                user_profile: user.user_profile,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(401);
            return next(new Error('Invalid username or password'));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password, user_profile } = req.body;

    if (!username || !password) {
        res.status(400);
        return next(new Error('Please provide all fields'));
    }

    try {
        const userExists = await User.findOne({ username });

        if (userExists) {
            res.status(400);
            return next(new Error('User already exists'));
        }

        const user = await User.create({
            username,
            password,
            user_profile,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                username: user.username,
                user_profile: user.user_profile,
                token: generateToken(user._id.toString()),
            });
        } else {
            res.status(400);
            return next(new Error('Invalid user data'));
        }
    } catch (error) {
        next(error);
    }
};

// @desc    Get current user profile
// @route   GET /api/auth/profile
// @access  Private
export const getUserProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById((req as any).user.id);

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                user_profile: user.user_profile,
            });
        } else {
            res.status(404);
            return next(new Error('User not found'));
        }
    } catch (error) {
        next(error);
    }
};