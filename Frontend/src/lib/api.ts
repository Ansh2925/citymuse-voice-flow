import { APIError, AuthResponse, City, LoginCredentials, SignupData, Story, User } from './types';

// API base URL from environment variables
const API_URL = import.meta.env.VITE_API_URL;

// Generic fetch wrapper with error handling
async function fetchWrapper<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    try {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
                ...options.headers,
            },
            credentials: 'include',
        });

        const data = await response.json();

        if (!response.ok) {
            const error: APIError = {
                message: data.message || 'Something went wrong',
                status: response.status
            };
            throw error;
        }

        return data as T;
    } catch (error) {
        if ((error as APIError).status === 401) {
            // Clear token and reload page on authentication error
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        throw error;
    }
}

// API functions
export const api = {
    // Auth related endpoints
    auth: {
        signup: (data: SignupData): Promise<AuthResponse> =>
            fetchWrapper('/api/auth/signup', {
                method: 'POST',
                body: JSON.stringify(data),
            }),
        login: (credentials: LoginCredentials): Promise<AuthResponse> =>
            fetchWrapper('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(credentials),
            }),
        logout: () => fetchWrapper('/api/auth/logout', { method: 'POST' }),
    },

    // User related endpoints
    user: {
        getProfile: (): Promise<User> => fetchWrapper('/api/auth/me'),
        updateProfile: (data: Partial<User>): Promise<User> =>
            fetchWrapper('/api/user/me', {
                method: 'PATCH',
                body: JSON.stringify(data),
            }),
    },

    // City related endpoints
    cities: {
        getAll: () => fetchWrapper('/api/cities'),
        getById: (id: string) => fetchWrapper(`/api/cities/${id}`),
        search: (query: string) => fetchWrapper(`/api/cities/search?q=${query}`),
    },

    // Story related endpoints
    stories: {
        generate: (params: { location: string; mood: string }) =>
            fetchWrapper('/api/story/generate', {
                method: 'POST',
                body: JSON.stringify(params),
            }),
        getNearby: (coords: { lat: number; lng: number }) =>
            fetchWrapper(`/api/story/nearby?lat=${coords.lat}&lng=${coords.lng}`),
    },

    // Mood detection endpoint
    detectMood: (text: string) =>
        fetchWrapper('/api/mood/detect', {
            method: 'POST',
            body: JSON.stringify({ text }),
        }),

    // Translation endpoint
    translate: (params: { text: string; targetLang: string }) =>
        fetchWrapper('/api/translate', {
            method: 'POST',
            body: JSON.stringify(params),
        }),
};
