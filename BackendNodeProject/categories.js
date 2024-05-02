const express = require('express');
const router = express.Router();
const db = require('./database');

// Define a route to fetch all categories
router.get('/', (req, res) => {
    // Use the database connection to execute the SQL query
    db.query('SELECT * FROM category')
        .then(results => {
            console.log('Categories:', results.rows); // Log the results
            res.json(results.rows);
        })
        .catch(error => {
            console.error('Error:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
// Define a route to fetch by categories separately
router.get('/:categoryId', async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const { rows } = await db.query('SELECT * FROM category WHERE category_id = $1', [categoryId]);
        console.log('Categories:', rows); // Log the result of the query
        const category = rows[0]; // Extract the first row from the result
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error getting information about the category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
});

// Define a route to fetch all actors
router.get('/actors', async (req, res) => {
    try {
        const actors = await db.query('SELECT * FROM actor');
        res.json(actors.rows);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
