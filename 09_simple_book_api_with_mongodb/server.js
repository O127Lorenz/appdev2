require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const bookRoutes = require('./Routes/bookRoutes');
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js, Express, and MongoDB');
});

// Use book routes
app.use('/books', bookRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});