import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        setLoading(false);
      });
      console.log(books)
  }, []);

  return (
    <div>
      <div className="flex ">
        <h1>Books List</h1>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        books.map((book) => { return (
          <div key={book._id}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.publishedYear}</p>
          </div>);
        })
      )}
    </div>
  );
};

export default Home;
