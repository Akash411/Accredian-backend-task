const pool = require('./config/database'); // Import your pool configuration

// Attempting to get a connection from the pool
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }

    console.log('Connected to the database!');
    
    // Release the connection back to the pool
    connection.release();
});

// If you want to check the status of the pool itself (not connections)
console.log('Pool status: ', pool._allConnections.length > 0 ? 'Connected' : 'Disconnected');
