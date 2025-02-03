import { query } from '../config/db.js';

export async function createUser(req, res) {
    try {
        // Your logic for creating a user
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}

export async function getUser(req, res) {
    try {
        const result = await query('SELECT * FROM test');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
}