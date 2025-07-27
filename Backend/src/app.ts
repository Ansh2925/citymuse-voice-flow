import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { validateEnv } from './utils/validateEnv';
import { PORT, MONGODB_URI, CORS_ORIGIN } from './config';
import authRoutes from './routes/authRoutes';
import storyRoutes from './routes/storyRoutes';
import moodRoutes from './routes/moodRoutes';
import voiceRoutes from './routes/voiceRoutes';
import cityRoutes from './routes/cityRoutes';

// Validate environment variables
const env = validateEnv();

// Create Express app
const app = express();

// Middleware
app.use(cors({
    origin: CORS_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/story', storyRoutes);
app.use('/api/mood', moodRoutes);
app.use('/api/voice', voiceRoutes);
app.use('/api/cities', cityRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
    res.status(200).json({ status: 'ok' });
});

// Import error handlers
import { errorHandler, notFoundHandler } from './utils/errorHandler';

// Handle 404 routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

import { connectDB } from './db';

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Server startup error:', error);
        process.exit(1);
    }
};

startServer();

export default app;