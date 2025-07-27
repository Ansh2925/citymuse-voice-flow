import express from 'express';
import { auth } from '../utils/auth';
import { validateStoryGeneration } from '../utils/validators';
import * as storyController from '../controllers/storyController';

const router = express.Router();

router.post('/generate', auth, validateStoryGeneration, storyController.generateStory);
router.get('/nearby', auth, storyController.getNearbyStories);
router.get('/cache', auth, storyController.getOfflineBundle);

export default router;
