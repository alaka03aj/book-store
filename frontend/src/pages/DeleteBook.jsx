import { useState } from "react";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  return (
    <div>
      <h1> Delete Book</h1>
      { loading ? <Spinner/> : ''}
      <div>
        <h3>Are you sure you wanna delete?</h3>
        <button onClick={handleBook}>Yes!</button>
      </div>
    </div>
  );
};

export default DeleteBook;
