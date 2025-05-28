require('dotenv').config();
const express = require('express');
const connectDB = require('./Config/db');
const bookRoutes = require('./Routes/bookRoutes');
const authRoutes = require('./Routes/authRoutes');
const rateLimit = require('./Middleware/rateLimiter');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const AppError = require('./Utils/appError');

const app = express();
const port = process.env.PORT || 3000;

// Ensure JWT_SECRET is set
if (!process.env.JWT_SECRET) {
    console.error('FATAL ERROR: JWT_SECRET is not defined');
    process.exit(1);
}

// Connect to MongoDB
connectDB();

// Security Middleware
app.use(helmet()); // Set security HTTP headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // HTTP request logger
app.use(express.json({ limit: '10kb' })); // Body parser with size limit

// Create API router
const apiRouter = express.Router();

// Apply rate limiting to API routes
apiRouter.use(rateLimit);

// Mount routes on API router
apiRouter.use('/auth', authRoutes);
apiRouter.use('/books', bookRoutes);

// Mount API router at /api
app.use('/api', apiRouter);

app.get('/', (req, res) => {
    res.send('Simple Book API using Node.js, Express, and MongoDB with Authentication');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});