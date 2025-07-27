import { cleanEnv, str, port } from 'envalid';

export const validateEnv = () => {
    return cleanEnv(process.env, {
        PORT: port(),
        MONGODB_URI: str(),
        JWT_SECRET: str(),
        OPENAI_API_KEY: str(),
        GOOGLE_TRANSLATE_API_KEY: str(),
        CORS_ORIGIN: str()
    });
};
