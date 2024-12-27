import express, { json } from 'express';
import axios from 'axios';
import { getGroqChatCompletion } from './groq.js';
import { createOrJoinSession } from './session.js';

const app = express();
const PORT = process.env.PORT || 3000; // Use PORT from the environment or default to 3000

let base64ImageDebug = '';

// Middleware to parse JSON payloads
app.use(json());


// Endpoint to handle name submission
app.post('/submit-image', (req, res) => {
    const { name, image } = req.body;
    base64ImageDebug = image;

    if (name) {
        console.log(`Received name: ${name} and an image`);
        res.status(200).send({ message: 'Name and image logged successfully!' });


        getGroqChatCompletion(image).then((chatCompletion) => {
            console.log('got completion');
            const content = chatCompletion.choices[0]?.message?.content;
            console.log(content);

            // Post to https://montagsmaler-multiplayer.onrender.com/update_answer
            axios.post('https://montagsmaler-multiplayer.onrender.com/update_answer', { answer: content })
            .then(response => {
                console.log('Posted to /update_answer:', response.data);
            })
            .catch(error => {
                console.error('Error posting to /update_answer:', error);
            });
        });
    } else {
        res.status(400).send({ message: 'Name is required.' });
    }
});

app.post('/new-session', (req, res) => {
    const { sesssionName, player } = req.body;

    // Create new session or join existing one
    console.log('create new session with name:', sesssionName, 'with player:', player);
    const session = createOrJoinSession(sesssionName, player);
    console.log('currentSession:', session);

    // Set task for player
    axios.post('https://montagsmaler-multiplayer.onrender.com/set_task', { task: session.task} ).then(response => {
        console.log('Posted /set_task. Response:', response.data);
    })
    .catch(error => {
        console.error('Error posting to /set_task:', error);
    });

    if (session.players?.length > 1) {
        console.log('Session is full. Starting game...');
        // TODO: Send start game to all players
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
