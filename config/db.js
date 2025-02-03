import pkg from 'pg';  // Import the entire 'pg' package as the default
const { Pool } = pkg;  // Destructure the 'Pool' from the imported package

import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false,
    }
});

pool.on('connect', () => {
    console.log('Connected to Render PostgreSQL database');
});

export function query(text, params) {
    return pool.query(text, params);
}

export default pool;
