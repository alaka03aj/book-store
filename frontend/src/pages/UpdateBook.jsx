import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {id} = useParams();
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setAuthor(response.data.author)
      setPublishedYear(response.data.publishedYear)
      setTitle(response.data.title)
      setLoading(false)
    })
    .catch((error) => {
      setLoading(false)
      alert("an error occured. couldn't edit the book")
      console.log(error)
    })
  }, [])

  const handleBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
    .then(() => {
      setLoading(false)
      navigate('/')
    })
    .catch((error) => {
      setLoading(false)
      alert("an error occured. couldn't add the book")
      console.log(error)
    })
  };

  return(
    <div>
      Edit Book
      { loading ? <Spinner /> : (
        <div>
          <label htmlFor="">Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          <label htmlFor="">Author</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <label htmlFor="">Published Year</label>
          <input type="text" value={publishedYear} onChange={(e) => setPublishedYear(e.target.value)} />
          <button type="submit" onClick={handleBook}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
