import pkg from 'pg'; // need do this else import errors
const { Pool } = pkg;

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
