import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
const app = express();

app.get("/", (request, response) => {
  return response.status(234).send("status 234 from server");
});

app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send({ message: "Make sure to answer all fields before submitting"})
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        }
        const book = await Book.create(newBook);
        return response.status(201).send({message: `Book created ${book}`})
    } catch(error) {
        console.log(error)
    }
})

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to db")
    app.listen(PORT, () => {
        console.log(`Port running: ${PORT}`)
      });
  })
  .catch((error) => {
    console.log(error)
  });
