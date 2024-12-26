const Book = require('../models/Book');
const stringSimilarity = require('string-similarity');

exports.addBook = async (req, res) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find()
      .skip(skip)
      .limit(limit);

    const total = await Book.countDocuments();

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalBooks: total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) return res.status(400).json({ message: 'Search query is required' });

    // Get all books
    const books = await Book.find();
    
    // Perform fuzzy search on title, author, and genre
    const results = books.map(book => {
      const titleSimilarity = stringSimilarity.compareTwoStrings(query.toLowerCase(), book.title.toLowerCase());
      const authorSimilarity = stringSimilarity.compareTwoStrings(query.toLowerCase(), book.author.toLowerCase());
      const genreSimilarity = stringSimilarity.compareTwoStrings(query.toLowerCase(), book.genre.toLowerCase());
      
      const maxSimilarity = Math.max(titleSimilarity, authorSimilarity, genreSimilarity);
      
      return {
        ...book.toObject(),
        similarity: maxSimilarity
      };
    })
    .filter(book => book.similarity > 0.3) // Threshold for similarity
    .sort((a, b) => b.similarity - a.similarity);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
