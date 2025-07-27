import { validationResult, body } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export const validateSignup = [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('username')
        .isLength({ min: 3 })
        .withMessage('Username must be at least 3 characters long'),
    validate
];

export const validateLogin = [
    body('email').isEmail().withMessage('Enter a valid email'),
    body('password').exists().withMessage('Password is required'),
    validate
];

export const validateStoryGeneration = [
    body('location').exists().withMessage('Location is required'),
    body('mood').exists().withMessage('Mood is required'),
    validate
];

export const validateTranslation = [
    body('text').exists().withMessage('Text is required'),
    body('targetLang').exists().withMessage('Target language is required'),
    validate
];

export const validateMoodDetection = [
    body('text').exists().withMessage('Text to analyze is required'),
    validate
];
