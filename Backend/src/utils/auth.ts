import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import User from '../models/User';

export interface AuthRequest extends Request {
    user?: any;
}

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, JWT_SECRET, {
        expiresIn: '7d'
    });
};

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error();
        }

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new Error();
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

export const adminAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        await auth(req, res, () => {
            if (req.user.role !== 'admin') {
                throw new Error('Admin privileges required');
            }
            next();
        });
    } catch (error) {
        res.status(403).json({ message: 'Admin privileges required' });
    }
};
