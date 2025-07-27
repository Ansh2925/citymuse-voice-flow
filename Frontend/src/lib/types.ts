export interface APIError {
    message: string;
    status?: number;
}

export interface User {
    id: string;
    username: string;
    email: string;
    language: string;
    role: 'user' | 'admin';
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface SignupData {
    email: string;
    password: string;
    username: string;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface City {
    id: string;
    name: string;
    country: string;
    description: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

export interface Story {
    id: string;
    title: string;
    text: string;
    mood: string;
    location: {
        type: string;
        coordinates: [number, number];
    };
    audioUrl?: string;
    time: Date;
}
