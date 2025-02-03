import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import morgan from 'morgan';

config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(json());
app.use(cors());
app.use(morgan('dev'));
import apiRoutes from './routes/apiRoutes.js';
import gadgetRoutes from "./routes/gadgetRoutes.js"

app.use('/api', apiRoutes);
app.use('/', gadgetRoutes)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});