// import express from 'express';
const express = require('express');
// import cors from 'cors';
const cors = require('cors');
const morgan = require('morgan');
// import morgan from 'morgan';
const rateLimit=require('express-rate-limit');
// import rateLimit from 'express-rate-limit';
// import dotenv from 'dotenv';
const dotenv=require('dotenv');
const mongoose=require('mongoose');
// import mongoose from 'mongoose';
const bookRoutes=require("./routes/bookRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/books', bookRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});