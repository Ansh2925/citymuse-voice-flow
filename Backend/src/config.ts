import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/citymuse';
export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-here';
export const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
export const GOOGLE_TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY;
export const CORS_ORIGIN = process.env.CORS_ORIGIN || 'http://localhost:5173';
