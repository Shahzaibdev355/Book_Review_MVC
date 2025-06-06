

import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
    ISBN: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
