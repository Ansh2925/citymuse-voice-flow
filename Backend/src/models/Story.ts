import mongoose, { Schema, Document } from 'mongoose';

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

const StorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    text: {
        type: String,
        required: true
    },
    mood: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    audioUrl: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Create geospatial index for location-based queries
StorySchema.index({ location: '2dsphere' });

export default mongoose.model<IStory>('Story', StorySchema);
