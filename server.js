import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';
import { verifyToken } from './middlewares/verifyJWT.js';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors());
app.use(morgan('dev'));
import authRoutes from './routes/authRoutes.js';
import gadgetRoutes from "./routes/gadgetRoutes.js"

app.use('/', authRoutes);
app.use('/', verifyToken, gadgetRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});