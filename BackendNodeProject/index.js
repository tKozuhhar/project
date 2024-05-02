const express = require('express');
const app = express();
const pool = require('./database'); // Import the database module
const actorsRouter = require('./actors'); // Import the actors router

app.use(express.json()); // Parse JSON bodies
app.use('/api/actors', actorsRouter); 

// Define the route for fetching categories
const categoriesRouter = require('./categories');
app.use('/categories', categoriesRouter);

app.use((req, res, next) => {
    console.log('Request body:', req.body);
    next();
});

app.post('/api/actors', async (req, res) => {
    console.log('Request body:', req.body); // Log the request body
    const { first_name, last_name, last_update } = req.body;
    try {
        const newActor = await pool.query(
            `INSERT INTO actor(first_name, last_name, last_update)
            VALUES($1, $2, $3) RETURNING *`,
            [first_name, last_name, last_update]
        );

        res.status(201).json(newActor.rows[0]);
    } catch (error) {
        console.error('Error when adding an actor:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.put('/api/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    const { first_name, last_name } = req.body; 
    try {
        // Check if the actor with the specified ID exists
        const existingActor = await pool.query('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
        if (existingActor.rows.length > 0) {
            // Update the actor's information
            await pool.query('UPDATE actor SET first_name = $1, last_name = $2 WHERE actor_id = $3', [first_name, last_name, actorId]); // Corrected variable names
            res.status(200).json({ message: 'Actor data updated' });
        } else {
            // If actor is not found, return a 404 error
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error('Error updating the actor data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});


// Define the route for updating an actor
app.put('/api/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    const { firstname, lastname } = req.body;
    try {
        // Check if the actor with the specified ID exists
        const existingActor = await pool.query('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
        if (existingActor.rows.length > 0) {
            // Update the actor's information
            await pool.query('UPDATE actor SET first_name = $1, last_name = $2 WHERE actor_id = $3', [firstname, lastname, actorId]);
            res.status(200).json({ message: 'Actor data updated' });
        } else {
            // If actor is not found, return a 404 error
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error('Error updating the actor data:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.delete('/api/actors/:id', async (req, res) => {
    const actorId = req.params.id;
    try {
        // Check if the actor with the specified ID exists
        const existingActor = await pool.query('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
        if (existingActor.rows.length > 0) {
            // Check if there are related entries in the film_actor table
            const relatedFilms = await pool.query('SELECT * FROM film_actor WHERE actor_id = $1', [actorId]);
            // If there are related entries, delete them before deleting the actor
            if (relatedFilms.rows.length > 0) {
                await pool.query('DELETE FROM film_actor WHERE actor_id = $1', [actorId]);
            }
            // Delete the actor from the database
            await pool.query('DELETE FROM actor WHERE actor_id = $1', [actorId]);
            res.status(204).json({ message: 'Actor successfully deleted' });
        } else {
            // If actor is not found, return a 404 error
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error('Error deleting an actor:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
