import { Router } from 'express';
import CityController from '../controllers/cityController';

const router = Router();
const cityController = new CityController();

router.get('/cities', cityController.getCities.bind(cityController));
router.get('/cities/:id', cityController.getCityById.bind(cityController));
router.post('/cities', cityController.createCity.bind(cityController));
router.put('/cities/:id', cityController.updateCity.bind(cityController));
router.delete('/cities/:id', cityController.deleteCity.bind(cityController));

export default router;