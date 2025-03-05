import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import cors from 'cors'
import { Book } from "./models/bookModel.js";
import booksRoute from './routes/booksRoute.js'

const app = express();
app.use(express.json());
app.use(cors()) //Allows all origin with deafult of cors

app.get("/", (request, response) => {
  return response.status(234).send("status 234 from server");
});

app.use('/books', booksRoute)

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to db");
    app.listen(PORT, () => {
      console.log(`Port running: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
