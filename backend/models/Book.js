const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  publishedYear: {
    type: Number,
    required: true,
  },
  isbn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  stockCount: {
    type: Number,
    required: true,
    min: 0,
  },
}, {
  timestamps: true,
});

// Create indexes for search functionality
bookSchema.index({ title: 'text', author: 'text', genre: 'text' });

// Export the model
module.exports = mongoose.model('Book', bookSchema);
