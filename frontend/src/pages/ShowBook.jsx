import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setBook(response.data)
      setLoading(false)
    })
    .catch((error) => {
      console.log(error)
      setLoading(false)
    })
  }, [])

  return (<div>
    {loading ? <Spinner/> : ( 
      <div>
        <h1>Title: {book.title}</h1>
        <p>Author: {book.author}</p>
        <p>Published Year: {book.publishedYear}</p>
        <p>Book ID: {book._id}</p> 
        <p>Created At: {(new Date(book.createdAt).toString())}</p>
        <p>Updated At: {(new Date(book.updatedAt).toString())}</p>
      </div>
    )}
  </div>);
};

export default ShowBook;
