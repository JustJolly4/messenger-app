const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
console.log("THIS IS THE SERVER.JS I AM EDITING!");
const app = express();
const PORT = 3001;


app.use(cors());
app.use(bodyParser.json());

// Endpoint to send a message
app.post('/sendMessage', (req, res) => {
    const { sender, recipient, message } = req.body;
    if (!sender || !recipient || !message) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    // Prepare message object
    const msgObj = {
        sender,
        recipient,
        message,
        timestamp: new Date().toISOString()
    };

    // Read existing messages (or initialize empty array)
    let messages = [];
    if (fs.existsSync('messages.json')) {
        messages = JSON.parse(fs.readFileSync('messages.json'));
    }
    // Add new message
    messages.push(msgObj);

    // Save messages back to file
    fs.writeFileSync('messages.json', JSON.stringify(messages, null, 2));
    res.json({ success: true, message: 'Message sent!' });
});  // <--- End of /sendMessage endpoint

// Endpoint to retrieve messages for a recipient
app.get('/retrieveMessages', (req, res) => {
    // ...

    console.log("GET /retrieveMessages called with:", req.query);

    const { recipient } = req.query;
    if (!recipient) {
        return res.status(400).json({ error: 'Recipient required' });
    }

    // Read all messages
    let messages = [];
    if (fs.existsSync('messages.json')) {
        messages = JSON.parse(fs.readFileSync('messages.json'));
    }

    // Filter messages for this recipient
    const recipientMessages = messages.filter(msg => msg.recipient === recipient);
    res.json({ messages: recipientMessages });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
