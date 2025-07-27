import mongoose, { Schema, Document } from 'mongoose';

export interface IMoodLog extends Document {
    userId: Schema.Types.ObjectId;
    timestamp: Date;
    mood: string;
    coordinates: [number, number];
}

const MoodLogSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    mood: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
});

export default mongoose.model<IMoodLog>('MoodLog', MoodLogSchema);
