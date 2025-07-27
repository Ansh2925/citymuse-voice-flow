import mongoose, { Schema, Document } from 'mongoose';

export interface ICity extends Document {
    name: string;
    country: string;
    description: string;
    attractions: string[];
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

const CitySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    attractions: [{
        type: String
    }],
    coordinates: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        }
    }
});

export default mongoose.model<ICity>('City', CitySchema);