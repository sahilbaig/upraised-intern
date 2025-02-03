const pool = require('../config/db');

module.exports.createUser = async (req, res) => {
    try {
        // Your logic for creating a user
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
};

module.exports.getUser = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM test');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Database error" });
    }
};