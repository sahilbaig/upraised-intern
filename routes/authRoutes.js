import express from 'express';
import { registerUser, loginUser } from '../handlers/authHandler.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);


export default router;
