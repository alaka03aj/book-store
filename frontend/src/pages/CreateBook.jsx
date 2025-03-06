import React, { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleBook = () => {
    const data = {
      title,
      author,
      publishedYear,
    };
    setLoading(true);
    axios.post("http://localhost:5555/books", data)
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
      Create Book
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

export default CreateBook;
