import express from 'express';
import { getUser } from '../handlers/apiHandler.js';

const router = express.Router();

router.get('/user', getUser);

export default router;
// This is test routes
