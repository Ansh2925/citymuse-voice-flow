import express from 'express';
import { auth } from '../utils/auth';
import { validateMoodDetection } from '../utils/validators';
import * as moodController from '../controllers/moodController';

const router = express.Router();

router.post('/detect', auth, validateMoodDetection, moodController.detectMood);
router.get('/history', auth, moodController.getMoodHistory);

export default router;
