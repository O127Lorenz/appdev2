const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcrypt');
const User = require('../Models/User');
const Book = require('../Models/Book');
require('dotenv').config();

const SALT_ROUNDS = 10;
const NUM_USERS = 5;
const NUM_BOOKS = 10;

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Clear existing collections
        await User.deleteMany({});
        await Book.deleteMany({});
        console.log('Cleared existing collections');

        // Create fake users
        const users = [];
        const commonPassword = await bcrypt.hash('Test@123', SALT_ROUNDS); // Common password for testing
        
        // Create one admin user
        const adminUser = await User.create({
            username: 'admin_user',
            email: 'admin@example.com',
            password: commonPassword
        });
        users.push(adminUser);
        console.log('Created admin user');

        // Create regular users
        for (let i = 0; i < NUM_USERS - 1; i++) {
            const username = faker.internet.userName().toLowerCase().replace(/[^a-z0-9]/g, '_');
            const user = await User.create({
                username: username,
                email: faker.internet.email(),
                password: commonPassword
            });
            users.push(user);
            console.log(`Created user: ${user.username}`);
        }

        // Create fake books with realistic titles and authors
        const genres = ['Fiction', 'Mystery', 'Science Fiction', 'Fantasy', 'Biography'];
        for (let i = 0; i < NUM_BOOKS; i++) {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const randomGenre = genres[Math.floor(Math.random() * genres.length)];
            const title = `The ${faker.word.adjective()} ${faker.word.noun()} of ${faker.word.noun()}`;
            const book = await Book.create({
                title: title,
                author: faker.person.fullName(),
                yearPublished: faker.number.int({ min: 1900, max: new Date().getFullYear() }),
                createdBy: randomUser._id
            });
            console.log(`Created book: ${book.title} by ${book.author}`);
        }

        console.log('Database seeding completed successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

// Run the seeder
seedDatabase();
