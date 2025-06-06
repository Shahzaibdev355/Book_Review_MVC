import Book from "../models/book.js";

export async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function addBook(req, res) {
  try {
    const foundBook = await Book.findOne(req.body); // Check if the book exists
    if (foundBook) {
      return res.json({ message: "Book Already Found!!" });
    }

    const newBook = new Book(req.body); // Create a new book document
    await newBook.save();
    res.json({ message: "Book Added Successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getBooksByISBN(req, res) {
  try {
    const { ISBN } = req.body;

    if (!ISBN) {
      return res.json({ message: "Please, provide a valid ISBN Code!" });
    }

    const foundBooks = await Book.find({ ISBN });
    if (foundBooks.length) {
      return res.json({ message: "Books are Found!!", foundBooks });
    }

    res.json({ message: "No book found with this ISBN Code!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getBooksByTitle(req, res) {
  try {
    const { title } = req.body;

    if (!title) {
      return res.json({ message: "Please, provide a valid title!" });
    }

    const foundBooks = await Book.find({ title: new RegExp(title, "i") }); // Case-insensitive title search
    if (foundBooks.length) {
      return res.json({ message: "Books are Found!!", foundBooks });
    }

    res.json({ message: "No book found with this title!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}

export async function getBooksByAuthor(req, res) {
  try {
    const { author } = req.body;

    if (!author) {
      return res.json({ message: "Please, provide a valid author name!" });
    }

    const foundBooks = await Book.find({ author: new RegExp(author, "i") }); // Case-insensitive author search
    if (foundBooks.length) {
      return res.json({ message: "Books are Found!!", foundBooks });
    }

    res.json({ message: "No book found with this author name!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error!!" });
  }
}
