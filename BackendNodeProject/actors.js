const express = require('express');
const router = express.Router();
const db = require('./database');

// Define a route to fetch all actors
router.get('/', async (req, res) => {
    try {
        const actors = await db.query('SELECT * FROM actor');
        res.json(actors.rows);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
