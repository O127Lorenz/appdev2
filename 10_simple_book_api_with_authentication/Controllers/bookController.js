const Book = require('../Models/Book');
const { bookSchema } = require('../Validators/book.validator');
const AppError = require('../Utils/appError');

// Get all books
const getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find()
            .populate('createdBy', 'username')
            .sort({ createdAt: -1 }); // Sort by newest first
        res.json({
            status: 'success',
            results: books.length,
            data: books
        });
    } catch (error) {
        next(new AppError('Error fetching books', 500));
    }
};

// Get a single book by ID
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('createdBy', 'username');
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create a new book
const createBook = async (req, res) => {
    try {
        const { title, author } = req.body;
        
        if (!title || !author) {
            return res.status(400).json({ message: 'Title and author are required' });
        }

        const book = await Book.create({
            title,
            author,
            createdBy: req.user.userId
        });

        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update a book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the user is the creator of the book
        if (book.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to update this book' });
        }

        const { title, author } = req.body;
        if (title) book.title = title;
        if (author) book.author = author;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Check if the user is the creator of the book
        if (book.createdBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this book' });
        }

        await book.deleteOne();
        res.json({ message: 'Book deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};
