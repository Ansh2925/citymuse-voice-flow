import { Response } from 'express';
import { AuthRequest } from '../types';
import Story from '../models/Story';
import aiService from '../services/aiService';
import mapService from '../services/mapService';

export const generateStory = async (req: AuthRequest, res: Response) => {
    try {
        const { location, mood } = req.body;
        const userId = req.user.id;

        // Get location details
        const locationDetails = await mapService.reverseGeocode(location.lat, location.lng);
        
        // Generate story using AI
        const storyText = await aiService.generateStory(
            locationDetails.display_name,
            mood
        );

        // Save story to database
        const story = new Story({
            title: `A ${mood} story in ${locationDetails.display_name}`,
            text: storyText,
            mood,
            language: 'en',
            location: {
                type: 'Point',
                coordinates: [location.lng, location.lat]
            },
            time: new Date()
        });

        await story.save();

        res.json({ story });
    } catch (error) {
        console.error('Story generation error:', error);
        res.status(500).json({
            message: 'Error generating story'
        });
    }
};

export const getNearbyStories = async (req: AuthRequest, res: Response) => {
    try {
        const { lat, lng, radius = 5000 } = req.query;

        const stories = await Story.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [parseFloat(lng as string), parseFloat(lat as string)]
                    },
                    $maxDistance: parseInt(radius as string)
                }
            }
        }).limit(10);

        res.json({ stories });
    } catch (error) {
        console.error('Nearby stories error:', error);
        res.status(500).json({
            message: 'Error fetching nearby stories'
        });
    }
};

export const getOfflineBundle = async (_: AuthRequest, res: Response) => {
    try {
        // Get a selection of stories for common moods
        const stories = await Story.find({
            mood: { $in: ['happy', 'calm', 'excited', 'curious'] }
        }).limit(20);

        // Create a ZIP bundle (simplified version)
        const bundle = {
            stories,
            timestamp: new Date(),
            version: '1.0'
        };

        res.json(bundle);
    } catch (error) {
        console.error('Offline bundle error:', error);
        res.status(500).json({
            message: 'Error creating offline bundle'
        });
    }
};
