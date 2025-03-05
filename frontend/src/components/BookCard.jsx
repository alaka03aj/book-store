import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const BookCard = ({ book }) => {
  return (
    <>
      <Link to={`/books/${book._id}`}>
        <div className="p-4 rounded-xl border border-black">
          <p>{book.title}</p>
          <p>{book.author}</p>
          <p>{book.publishedYear}</p>
        </div>
        <div className="bottom-0 flex justify-center">
            <Link to={`/books/edit/${book._id}`}><AiOutlineEdit /></Link>
            <Link to={`/books/delete/${book._id}`}><MdOutlineDelete /></Link>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
