const { Pool } = require('pg');

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres', // PostgreSQL username
    host: 'localhost', // PostgreSQL host
    database: 'postgres', // PostgreSQL database name
    password: '1234', // PostgreSQL password
    port: 5432 // PostgreSQL port (default is 5432)
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool // Optionally, you can export the pool directly if needed
};
