import { Request } from 'express';
import { Document } from 'mongoose';

export interface AuthRequest extends Request {
    user?: any;
}

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    language: string;
    role: 'user' | 'admin';
    comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface IStory extends Document {
    title: string;
    text: string;
    mood: string;
    language: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    audioUrl?: string;
    time: Date;
}

export interface IMoodLog extends Document {
    userId: string;
    mood: string;
    coordinates: [number, number];
    timestamp: Date;
}