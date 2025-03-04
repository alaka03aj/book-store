# Node.js and MongoDB Project Setup

## Project Initialization

### 1. Create Project Structure
- Create two folders for frontend and backend
- Navigate to the backend folder
- Initialize Node.js project
```bash
npm init -y
```

### 2. Configure package.json
Update `package.json` with:
```json
{
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  }
}
```

### 3. Install Dependencies
```bash
npm i express nodemon
```

## Backend Setup

### 4. Create Configuration (config.js)
```javascript
export const PORT = 5555;
export const mongoDBURL = 'your_mongodb_connection_string_here';
```

### 5. Create index.js
```javascript
import express from 'express';
import mongoose from 'mongoose';
import { PORT, mongoDBURL } from './config.js';
import Book from './models/bookModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Root route handler
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("status 234 from server");
});

// Connect to MongoDB
mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });
```

### 6. Create Book Model (models/bookModel.js)
```javascript
import mongoose from 'mongoose';

const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishedYear: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Book', bookSchema);
```

### 7. Book Creation Route
```javascript
// Route to save a new book
app.post('/books', async (request, response) => {
    try {
        console.log(request.body);
        
        // Validate request body
        if (!request.body.title || !request.body.author || !request.body.publishedYear) {
            return response.status(400).send({ 
                message: "Make sure to answer all fields before submitting"
            });
        }

        // Create new book object
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishedYear: request.body.publishedYear,
        };

        // Save book to database
        const book = await Book.create(newBook);
        
        return response.status(201).send({
            message: `Book created ${book}`
        });
    } catch(error) {
        console.log(error);
        response.status(500).send({ message: error.message });
    }
});
```

## Running the Project
```bash
# Start the server
npm run dev
```

### Notes
- Ensure MongoDB is installed and running
- Replace `mongoDBURL` with your actual MongoDB connection string
- Use Postman or similar tool to test API endpoints