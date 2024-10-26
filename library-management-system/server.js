const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./library.db'); // Adjust path if necessary

app.use(bodyParser.json());
app.use(cors());


// Get all books
app.get('/api/inventory', (req, res) => {
    db.all('SELECT * FROM Inventory', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

// Add a book
app.post('/api/inventory', (req, res) => {
    const { Title, Author, Genre, PublicationDate, ISBN } = req.body;

    // Log the incoming request data for debugging
    console.log('Received request to add book:', Title, Author, Genre, PublicationDate, ISBN);

    db.run('INSERT INTO Inventory (Title, Author, Genre, PublicationDate, ISBN) VALUES (?, ?, ?, ?, ?)',
        [Title, Author, Genre, PublicationDate, ISBN],
        function(err) {
            if (err) {
                console.error('Error inserting book:', err.message);
                return res.status(400).json({ error: 'Failed to add book' });
            }
            res.status(201).json({ message: 'Book added successfully', entryId: this.lastID });
        });
});
// Delete a book
app.delete('/api/inventory/:id', (req, res) => {
    const bookId = parseInt(req.params.id); // Convert the ID from string to integer

    db.run('DELETE FROM Inventory WHERE EntryID = ?', bookId, function(err) {
        if (err) {
            console.error('Error deleting book:', err.message);
            return res.status(500).json({ error: 'Failed to delete book' });
        }
        
        if (this.changes === 0) {
            // No rows were deleted
            return res.status(404).json({ message: 'Book not found' });
        }

        res.status(204).send(); // No Content
    });
});



const displayInventoryInConsole = () => {
    db.all('SELECT * FROM Inventory', [], (err, rows) => {
        if (err) {
            console.error('Error retrieving inventory:', err.message);
            return;
        }
        console.log('Current Inventory:');
        console.table(rows); // This will display the rows in a table format in the console
    });
};

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    displayInventoryInConsole();
});
