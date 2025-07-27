import express from 'express';
import { auth } from '../utils/auth';
import * as voiceController from '../controllers/voiceController';

const router = express.Router();

router.post('/transcribe', auth, voiceController.transcribeAudio);
router.get('/synthesize', auth, voiceController.synthesizeText);

export default router;
