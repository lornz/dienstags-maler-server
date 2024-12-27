const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from the environment or default to 3000

// Middleware to parse JSON payloads
app.use(express.json());

// Endpoint to handle name submission
app.post('/submit-name', (req, res) => {
    const { name } = req.body;

    if (name) {
        console.log(`Received name: ${name}`);
        res.status(200).send({ message: 'Name logged successfully!' });
    } else {
        res.status(400).send({ message: 'Name is required.' });
    }
});

// Catch-all route for unmatched requests
app.use((req, res) => {
    res.status(404).send({ message: 'Endpoint not found.' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on https://dienstags-maler-server.onrender.com:${PORT}`);
});
