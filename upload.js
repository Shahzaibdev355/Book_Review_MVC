import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

// MongoDB configuration
const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.DATABASE_NAME; 

// Books data
let books = {
    1: { "author": "Chinua Achebe", "title": "Things Fall Apart", "reviews": {} },
    2: { "author": "Hans Christian Andersen", "title": "Fairy tales", "reviews": {} },
    3: { "author": "Dante Alighieri", "title": "The Divine Comedy", "reviews": {} },
    4: { "author": "Unknown", "title": "The Epic Of Gilgamesh", "reviews": {} },
    5: { "author": "Unknown", "title": "The Book Of Job", "reviews": {} },
    6: { "author": "Unknown", "title": "One Thousand and One Nights", "reviews": {} },
    7: { "author": "Unknown", "title": "Nj\u00e1l's Saga", "reviews": {} },
    8: { "author": "Jane Austen", "title": "Pride and Prejudice", "reviews": {} },
    9: { "author": "Honor\u00e9 de Balzac", "title": "Le P\u00e8re Goriot", "reviews": {} },
    10: { "author": "Samuel Beckett", "title": "Molloy, Malone Dies, The Unnamable, the trilogy", "reviews": {} }
};

// Define the book schema and model
const bookSchema = new mongoose.Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    reviews: { type: Object, default: {} }
});

const Book = mongoose.model('Book', bookSchema);

async function uploadBooks() {
    try {
        // Connect to MongoDB
        await mongoose.connect(MONGODB_URI, {
            dbName: DATABASE_NAME,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');

        // Clear the existing books collection
        await Book.deleteMany({});
        console.log('Existing books cleared');

        // Upload new books
        const booksArray = Object.values(books); // Convert the books object to an array
        await Book.insertMany(booksArray);
        console.log('Books uploaded successfully');

        // Close the connection
        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (error) {
        console.error('Error uploading books:', error.message);
    }
}

// Run the function
uploadBooks();
