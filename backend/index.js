const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit=require('express-rate-limit');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
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
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Library Management</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #f0f0f0;
        }
        h1 {
          text-align: center;
          color: #333;
        }
      </style>
    </head>
    <body>
      <h1>Library Management API connected successfully</h1>
    </body>
    </html>
  `);
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});