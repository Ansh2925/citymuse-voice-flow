import express from 'express';
import { auth } from '../utils/auth';
import {
    validateSignup,
    validateLogin
} from '../utils/validators';
import * as authController from '../controllers/authController';

const router = express.Router();

// Public routes
router.post('/signup', validateSignup, authController.signup);
router.post('/login', validateLogin, authController.login);

// Protected routes
router.post('/logout', auth, authController.logout);
router.get('/me', auth, authController.getProfile);

export default router;
