import Review from "../models/review.js";

export async function addReview(req, res) {
    try {
        // Data to be stored
        const { user_id } = req.user;
        const book_id = req.params.id;
        const { review_text } = req.body;

        const foundReview = await Review.findOne({ user: user_id, book: book_id });

        if (foundReview) {
            // Update the existing review
            foundReview.review_text = review_text;
            await foundReview.save();
            return res.json({ message: "Review added/updated successfully!" });
        }

        // Create a new review
        const newReview = new Review({ user: user_id, book: book_id, review_text });
        await newReview.save();
        res.json({ message: "Review added successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function getReview(req, res) {
    try {
        const { id } = req.params;

        // Retrieve all reviews for the specified book
        const bookReviews = await Review.find({ book: id }, { review_text: 1 });

        if (!bookReviews.length) {
            return res.json({ message: "No reviews found for this book!" });
        }

        res.json({ message: "Reviews found for this book", bookReviews });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}

export async function deleteReview(req, res) {
    try {
        const { user_id } = req.user;
        const { id } = req.params;

        // Delete the review matching user and book
        const deletedReview = await Review.findOneAndDelete({ user: user_id, book: id });

        if (!deletedReview) {
            return res.json({ message: "No review found for that user to delete!" });
        }

        res.json({ message: "Review deleted successfully!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error!!" });
    }
}
