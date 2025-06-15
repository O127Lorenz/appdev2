const express = require('express');
const router = express.Router();
const authMiddleware = require('../Middleware/auth.middleware');
const emailMiddleware = require('../Middleware/send-email.middleware');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../Controllers/bookController');

// Apply auth middleware to all routes
router.use(authMiddleware);

// Book routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', emailMiddleware, createBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;
