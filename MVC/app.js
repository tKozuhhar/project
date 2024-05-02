const express = require('express');
const app = express();

// Import controllers and routes
const { actorsController, categoriesController } = require('./controllers');
const { actorsRoutes, categoriesRoutes } = require('./routes');

// Middleware to parse JSON bodies
app.use(express.json());

// Mount routes
app.use('/api/actors', actorsRoutes);
app.use('/api/categories', categoriesRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
