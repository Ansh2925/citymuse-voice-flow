import OpenAI from 'openai';
import { OPENAI_API_KEY } from '../config';

class AIService {
    private openai: OpenAI;

    constructor() {
        this.openai = new OpenAI({
            apiKey: OPENAI_API_KEY
        });
    }

    async generateStory(location: string, mood: string, language: string = 'en'): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a creative travel writer who specializes in creating engaging and authentic stories about places."
                    },
                    {
                        role: "user",
                        content: `Generate a short, engaging story about ${location} that would appeal to someone in a ${mood} mood. The story should be informative, culturally sensitive, and capture the essence of the location.`
                    }
                ],
                max_tokens: 500,
                temperature: 0.7,
            });

            return response.choices[0]?.message?.content || '';
        } catch (error) {
            console.error('Error generating story:', error);
            throw new Error('Failed to generate story');
        }
    }

    async enhanceStoryWithContext(story: string, context: any): Promise<string> {
        try {
            const response = await this.openai.chat.completions.create({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are an expert at enhancing travel stories with rich cultural and contextual details."
                    },
                    {
                        role: "user",
                        content: `Enhance this story with more details about ${context.location}, considering the time of day (${context.timeOfDay}) and current events: ${story}`
                    }
                ],
                max_tokens: 200,
                temperature: 0.6,
            });

            return response.choices[0]?.message?.content || story;
        } catch (error) {
            console.error('Error enhancing story:', error);
            return story; // Return original story if enhancement fails
        }
    }
}

export default new AIService();
