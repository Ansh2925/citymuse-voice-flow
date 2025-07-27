import City, { ICity } from '../models/city';

class CityService {
    public async getAllCities() {
        try {
            return await City.find();
        } catch (error) {
            throw error;
        }
    }

    public async getCityById(cityId: string) {
        try {
            const city = await City.findById(cityId);
            if (!city) {
                return null;
            }
            return city;
        } catch (error) {
            throw error;
        }
    }

    public async createCity(cityData: Partial<ICity>) {
        try {
            const newCity = new City(cityData);
            return await newCity.save();
        } catch (error) {
            throw error;
        }
    }

    public async updateCity(cityId: string, cityData: Partial<ICity>) {
        try {
            const updatedCity = await City.findByIdAndUpdate(
                cityId,
                cityData,
                { new: true, runValidators: true }
            );
            return updatedCity;
        } catch (error) {
            throw error;
        }
    }

    public async deleteCity(cityId: string) {
        try {
            const deletedCity = await City.findByIdAndDelete(cityId);
            return deletedCity;
        } catch (error) {
            throw error;
        }
    }
}

export default CityService;