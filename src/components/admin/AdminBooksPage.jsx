import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/bookSlice";
import AdminNavbar from "./adminNavbar";
import { Link } from "react-router-dom";
import AdminBookDelete from "./AdminBookDelete";
import MuiLoader from "../MuiLoader";

function AdminBooksPage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector((state) => state.user);
  const books = useSelector((state) => state.book.books);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  const bookHandler = async () => {
    try {
      const { data } = await axios.get("/api/books");
      dispatch(setBooks(data));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookHandler();
  }, []);

  if (!loading) {
    return (
      <div className="loadingContainer">
        <MuiLoader />
      </div>
    );
  }

  return (
    <div>
      <div className="adminProductPage">
        <div>
          <h1>Product List</h1>
        </div>
        <Link to={"/admin/books/add"}>
          <button style={{ marginBottom: "10px" }}>Add Product</button>
        </Link>
        <div className="adminProductContainer">
          <table className="adminProductTable">
            <tbody>
              {books.map((book, index) => {
                return (
                  <tr className="adminProducttr" key={book.id}>
                    <td className="adminProducttd">
                      {index}: {book.title} {book.volume} {book.edition}
                    </td>
                    <td className="adminProductButton">
                      <Link to={`/admin/books/${book.id}`}>
                        <button>Edit</button>
                      </Link>
                      <AdminBookDelete
                        bookId={book.id}
                        deactivated={book.isDeactivated}
                        bookHandler={bookHandler}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminBooksPage;
