import { Request, Response } from 'express';
import MoodDetector from '../services/moodDetector';
import MoodLog from '../models/MoodLog';
import { AuthRequest } from '../types';

export const detectMood = async (req: AuthRequest, res: Response) => {
    try {
        const { text } = req.body;
        const { mood, confidence } = await MoodDetector.analyzeMoodWithContext(text, 'morning', 'unknown');
        
        // Save mood to history
        const moodLog = new MoodLog({
            userId: req.user.id,
            text,
            mood,
            timestamp: new Date()
        });
        await moodLog.save();

        res.json({ mood });
    } catch (error) {
        console.error('Mood detection error:', error);
        res.status(500).json({ message: 'Failed to detect mood' });
    }
};

export const getMoodHistory = async (req: AuthRequest, res: Response) => {
    try {
        const moodLogs = await MoodLog.find({ userId: req.user.id })
            .sort({ timestamp: -1 })
            .limit(10);
        res.json(moodLogs);
    } catch (error) {
        console.error('Get mood history error:', error);
        res.status(500).json({ message: 'Failed to get mood history' });
    }
};
