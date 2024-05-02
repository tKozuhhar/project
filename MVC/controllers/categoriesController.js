const db = require('../database');

// Fetch all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await db.query('SELECT * FROM category');
        res.json(categories.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Fetch category by ID
exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const { rows } = await db.query('SELECT * FROM category WHERE category_id = $1', [categoryId]);
        const category = rows[0];
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error getting information about the category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};

// Create a new category
exports.createCategory = async (req, res) => {
    const { name } = req.body;
    try {
        // Insert the new category into the database
        const result = await db.query('INSERT INTO category (name) VALUES ($1) RETURNING *', [name]);
        const newCategory = result.rows[0];
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
// Update a category by ID
exports.updateCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId;
    const { name } = req.body;
    try {
        // Check if the category exists
        const existingCategory = await db.query('SELECT * FROM category WHERE category_id = $1', [categoryId]);
        if (existingCategory.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        // Update the category
        await db.query('UPDATE category SET name = $1 WHERE category_id = $2', [name, categoryId]);
        
        // Fetch the updated category
        const updatedCategory = await db.query('SELECT * FROM category WHERE category_id = $1', [categoryId]);
        res.json(updatedCategory.rows[0]);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Server Error' });
    }
};
// Delete category by ID
exports.deleteCategoryById = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        // Check if there are associated records in the film_category table
        const checkAssociatedRecords = await db.query('SELECT * FROM film_category WHERE category_id = $1', [categoryId]);
        if (checkAssociatedRecords.rows.length > 0) {
            // If there are associated records, delete them first
            await db.query('DELETE FROM film_category WHERE category_id = $1', [categoryId]);
        }

        // Once associated records are deleted, delete the category
        await db.query('DELETE FROM category WHERE category_id = $1', [categoryId]);
        res.status(204).json({ message: 'Category successfully deleted' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

