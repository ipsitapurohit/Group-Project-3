const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3010;
// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/stocks');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define a schema for your data
const dataSchema = new mongoose.Schema({
    Metadata: {
        Symbol: String,
        Interval: String,
        Timezone: String
    },
    Results: [{
        Date: {
            type: Date,
            set: function (dateString) {
                // Parse the date string and create a Date object
                const [year, month, day] = dateString.split('-').map(Number);
                return new Date(year, month - 1, day);
            }
        },
        Open: Number,
        Close: Number,
        High: Number,
        Low: Number,
        Volume: Number,
        AdjClose: Number
    }]
});

// Create a model based on the schema
const Data = mongoose.model('Data', dataSchema);

// Route to save the payload to MongoDB
app.post('/api/insertData', async (req, res) => {
    try {
        const payload = req.body;
        // Convert date strings to Date objects
        // payload.Results.forEach(result => {
        //     result.Date = new Date(result.Date);
        // });
        const newData = new Data(payload);
        await newData.save();
        res.status(201).json({ message: 'Data saved successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});