# Library Management Application - Forescribe Backend Assignment

This is a REST API for managing a library's book inventory built with Node.js, Express, and MongoDB.

## Testing Links

- Frontend URL: [Library Management Frontend](https://library-management-frontend-testing.vercel.app/)
- Backend URL: [Library Management API](https://library-management-frontend-testing.vercel.app/)

## Setup

To set up and run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run the following commands to install dependencies and start the development server:

```bash
npm install
npm run dev
```

### Required Environment Variables:

- `PORT=5000`
- `MONGODB_URI=your_mongodb_connection_string`

## API Endpoints

### Books

#### GET /api/books

Retrieves a paginated list of books.

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**
```json
{
  "books": [{
    "_id": "string",
    "title": "string",
    "author": "string",
    "genre": "string",
    "publishedYear": "number",
    "isbn": "string",
    "stockCount": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }],
  "currentPage": "number",
  "totalPages": "number",
  "totalBooks": "number"
}
```

#### GET /api/books/:id

Retrieves a specific book by its ID.

**Parameters:**
- `id`: Book ID (MongoDB ObjectId)

**Response:** Single book object

#### POST /api/books

Creates a new book.

**Required Body:**
```json
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "publishedYear": "number",
  "isbn": "string (unique)",
  "stockCount": "number (>= 0)"
}
```

**Response:** Created book object

#### PUT /api/books/:id

Updates an existing book.

**Parameters:**
- `id`: Book ID (MongoDB ObjectId)

**Body (all fields optional):**
```json
{
  "title": "string",
  "author": "string",
  "genre": "string",
  "publishedYear": "number",
  "isbn": "string",
  "stockCount": "number"
}
```

**Response:** Updated book object

#### DELETE /api/books/:id

Deletes a book.

**Parameters:**
- `id`: Book ID (MongoDB ObjectId)

**Response:**
```json
{
  "message": "Book deleted successfully"
}
```

#### GET /api/books/search

Searches for books using fuzzy matching.

**Query Parameters:**
- `query`: Search term to match against title, author, or genre

**Response:**
```json
[
  {
    "_id": "string",
    "title": "string",
    "author": "string",
    "genre": "string",
    "publishedYear": "number",
    "isbn": "string",
    "stockCount": "number",
    "similarity": "number (0-1)"
  }
]
```

## Error Responses

All endpoints return error responses in the following format:

```json
{
  "message": "Error description"
}
```

**Common HTTP Status Codes:**
- 400: Bad Request (invalid input)
- 404: Not Found
- 500: Server Error

## Rate Limiting

- 100 requests per 15 minutes per IP
- Exceeded limit response: 429 Too Many Requests

## Database Schema

**Book Model:**
```javascript
{
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  isbn: { type: String, required: true, unique: true },
  stockCount: { type: Number, required: true, min: 0 }
}
```

**Text Indexes on:** title, author, genre
