const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 3100;
app.use(cors());
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
        Date: Date,
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

// Route to fetch data from MongoDB based on symbol and date range
app.get('/api/getData', async (req, res) => {
    try {
        // Extract symbol, start date, and end date from query parameters
        const { symbol, startDate, endDate } = req.query;

        console.log(symbol);
        console.log(startDate);
        console.log(endDate);
        const startDateFormatted = new Date(startDate).toISOString();
        const endDateFormatted = new Date(endDate).toISOString();

        console.log('startDateFormatted   ', startDateFormatted);
        console.log('endDateFormatted     ', endDateFormatted);

        // Construct query based on symbol and date range
        const query = {
            'Metadata.Symbol': symbol,
            'Results.Date': { $gte: startDateFormatted, $lte: endDateFormatted }
        };
        console.log(query);
        // Projection to include only Date and Close fields
        const projection = { 'Results.Date': 1, 'Results.Close': 1, _id: 0 };

        // Find documents matching the query and apply projection
        const data = await Data.find(query, projection);
        console.log('Data ', data);
        const filteredData = data.map(doc => ({
            Results: doc.Results.filter(result => {
                const resultDate = new Date(result.Date);
                return resultDate >= new Date(startDate) && resultDate <= new Date(endDate);
            })
        })).filter(doc => doc.Results.length > 0);
        
        console.log('Filtered Data ', filteredData)
        
        // If no documents found, send an empty array
        if (filteredData.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).json(filteredData);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});