
const express = require('express');
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks
} = require('../controllers/bookController');

const router = express.Router();


router.post('/', addBook);
router.get('/', getBooks);
router.get('/search', searchBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

module.exports = router;