const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsController');

// Define routes for actors
router.get('/', actorsController.getAllActors);
router.put('/:id', actorsController.updateActor);
router.delete('/:id', actorsController.deleteActor);

module.exports = router;
