import Sentiment from 'sentiment';

const sentiment = new Sentiment();

class MoodDetector {
    private moods = ['happy', 'sad', 'excited', 'calm', 'curious', 'tired', 'adventurous'];

    async detectMood(text: string): Promise<string> {
        try {
            const analysis = sentiment.analyze(text);
            const score = analysis.score;
            
            // Map sentiment score to mood
            if (score > 3) return 'happy';
            if (score > 1) return 'excited';
            if (score > -1) return 'calm';
            if (score > -3) return 'tired';
            return 'sad';
        } catch (error) {
            console.error('Error detecting mood:', error);
            return 'neutral'; // Default fallback mood
        }
    }

    async analyzeMoodWithContext(text: string, timeOfDay: string, location: string): Promise<{
        mood: string;
        confidence: number;
    }> {
        const baseResult = await this.detectMood(text);
        
        // Adjust mood based on time of day
        const timeAdjustments: { [key: string]: string[] } = {
            'morning': ['excited', 'adventurous'],
            'afternoon': ['happy', 'curious'],
            'evening': ['calm', 'tired'],
            'night': ['calm', 'tired']
        };

        const possibleMoods = timeAdjustments[timeOfDay] || ['neutral'];
        
        return {
            mood: baseResult,
            confidence: 0.8 // Simplified confidence score
        };
    }
}

export default new MoodDetector();
