import axios from 'axios';

class MapService {
    private nominatimBaseUrl = 'https://nominatim.openstreetmap.org';
    
    async reverseGeocode(lat: number, lon: number): Promise<any> {
        try {
            const response = await axios.get(`${this.nominatimBaseUrl}/reverse`, {
                params: {
                    lat,
                    lon,
                    format: 'json'
                }
            });
            return response.data;
        } catch (error) {
            console.error('Reverse geocoding error:', error);
            throw new Error('Failed to get location details');
        }
    }

    async searchNearbyPlaces(lat: number, lon: number, radius: number = 1000): Promise<any[]> {
        try {
            const response = await axios.get(`${this.nominatimBaseUrl}/search`, {
                params: {
                    lat,
                    lon,
                    format: 'json',
                    limit: 10,
                    radius
                }
            });
            return response.data;
        } catch (error) {
            console.error('Nearby search error:', error);
            return [];
        }
    }

    async getPointsOfInterest(lat: number, lon: number): Promise<any[]> {
        try {
            const response = await axios.get(`${this.nominatimBaseUrl}/search`, {
                params: {
                    lat,
                    lon,
                    format: 'json',
                    amenity: ['restaurant', 'cafe', 'museum', 'park'].join('|'),
                    limit: 20
                }
            });
            return response.data;
        } catch (error) {
            console.error('POI search error:', error);
            return [];
        }
    }

    calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        return R * c;
    }

    private toRad(degrees: number): number {
        return degrees * Math.PI / 180;
    }
}

export default new MapService();
