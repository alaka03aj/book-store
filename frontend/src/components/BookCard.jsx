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
          <div className="flex gap-2 justify-end">
            <Link to={`/books/edit/${book._id}`}><AiOutlineEdit /></Link>
            <Link to={`/books/delete/${book._id}`}><MdOutlineDelete /></Link>
        </div>
        </div>
        
      </Link>
    </>
  );
};

export default BookCard;
