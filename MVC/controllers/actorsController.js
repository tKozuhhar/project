const db = require('../database');

// Fetch all actors
exports.getAllActors = async (req, res) => {
    try {
        const actors = await db.query('SELECT * FROM actor');
        res.json(actors.rows);
    } catch (error) {
        console.error('Error fetching actors:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Update an actor
exports.updateActor = async (req, res) => {
    const actorId = req.params.id;
    const { first_name, last_name } = req.body;
    try {
        const existingActor = await db.query('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
        if (existingActor.rows.length > 0) {
            await db.query('UPDATE actor SET first_name = $1, last_name = $2 WHERE actor_id = $3', [first_name, last_name, actorId]);
            res.status(200).json({ message: 'Actor data updated' });
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error('Error updating the actor data:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete an actor
exports.deleteActor = async (req, res) => {
    const actorId = req.params.id;
    try {
        const existingActor = await db.query('SELECT * FROM actor WHERE actor_id = $1', [actorId]);
        if (existingActor.rows.length > 0) {
            const relatedFilms = await db.query('SELECT * FROM film_actor WHERE actor_id = $1', [actorId]);
            if (relatedFilms.rows.length > 0) {
                await db.query('DELETE FROM film_actor WHERE actor_id = $1', [actorId]);
            }
            await db.query('DELETE FROM actor WHERE actor_id = $1', [actorId]);
            res.status(204).json({ message: 'Actor successfully deleted' });
        } else {
            res.status(404).json({ error: 'Actor not found' });
        }
    } catch (error) {
        console.error('Error deleting an actor:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
