import { TranslationServiceClient } from '@google-cloud/translate';
import { GOOGLE_TRANSLATE_API_KEY } from '../config';

class Translator {
    private client: TranslationServiceClient;
    private projectId: string;
    private location = 'global';

    constructor() {
        this.client = new TranslationServiceClient({
            credentials: {
                private_key: GOOGLE_TRANSLATE_API_KEY,
                client_email: process.env.GOOGLE_CLIENT_EMAIL
            }
        });
        this.projectId = process.env.GOOGLE_PROJECT_ID || '';
    }

    async translateText(text: string, targetLang: string): Promise<string> {
        try {
            const request = {
                parent: `projects/${this.projectId}/locations/${this.location}`,
                contents: [text],
                mimeType: 'text/plain',
                targetLanguageCode: targetLang,
            };

            const [response] = await this.client.translateText(request);
            return response.translations?.[0]?.translatedText || text;
        } catch (error) {
            console.error('Translation error:', error);
            throw new Error('Translation failed');
        }
    }

    async detectLanguage(text: string): Promise<string> {
        try {
            const request = {
                parent: `projects/${this.projectId}/locations/${this.location}`,
                content: text,
                mimeType: 'text/plain',
            };

            const [response] = await this.client.detectLanguage(request);
            return response.languages?.[0]?.languageCode || 'en';
        } catch (error) {
            console.error('Language detection error:', error);
            return 'en'; // Default to English
        }
    }

    async translateBatch(texts: string[], targetLang: string): Promise<string[]> {
        try {
            const request = {
                parent: `projects/${this.projectId}/locations/${this.location}`,
                contents: texts,
                mimeType: 'text/plain',
                targetLanguageCode: targetLang,
            };

            const [response] = await this.client.translateText(request);
            return response.translations?.map(t => t.translatedText || '') || texts;
        } catch (error) {
            console.error('Batch translation error:', error);
            return texts; // Return original texts on error
        }
    }
}

export default new Translator();
