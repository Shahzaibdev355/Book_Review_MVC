// import { DataTypes } from "sequelize";
// import { sequelize } from "../config/connection.js"

// import mongoose from "mongoose";

// // models
// import user from "./user.js"
// import book from "./book.js"

// const review = mongoose.Schema({
//     review_text: {
//         type: STRING,
//         required: true
//     }
// });

// user.belongsToMany(book, { through: review });
// book.belongsToMany(user, { through: review });

// export default review;



import mongoose from "mongoose";

// User model
import User from "./user.js";
// Book model
import Book from "./book.js";

// Review Schema
const reviewSchema = new mongoose.Schema({
    review_text: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Book,
        required: true
    }
});

// Create the Review model
const Review = mongoose.model("Review", reviewSchema);

export default Review;
