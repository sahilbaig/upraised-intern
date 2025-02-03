import express from 'express';  // Import 'express' using the ES module syntax
import { getUser } from '../handlers/apiHandler.js';  // Ensure to add .js extension for ES modules

const router = express.Router();

router.get('/user', getUser);

export default router;  // Export the router as default
