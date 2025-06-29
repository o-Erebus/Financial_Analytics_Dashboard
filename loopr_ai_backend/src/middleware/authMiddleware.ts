import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

interface AuthenticatedRequest extends Request {
    user?: any; // Define a more specific type for user if possible
}

export const protect = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

            // Attach user to request object, excluding password
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            next(new Error('Not authorized, token failed'));
        }
    }

    if (!token) {
        res.status(401);
        next(new Error('Not authorized, no token'));
    }
};