import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBooks } from "../../store/bookSlice";
import { Link } from "react-router-dom";
import AdminBookDelete from "./AdminBookDelete";
import MuiLoader from "../MuiLoader";
import ReactPaginate from "react-paginate";

function AdminBooksPage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector((state) => state.user);
  const books = useSelector((state) => state.book.books);
  const [currentPage, setCurrentPage] = useState(0);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  const bookHandler = async () => {
    try {
      console.log("inside bookHandler");
      const { data } = await axios.get("/api/books");
      dispatch(setBooks(data));
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  // PAGINATE LOGIC
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  // Pre-sort the books by their ID in the database
  const sortedBooks = [...books];
  sortedBooks.sort((a, b) => (a.id > b.id ? 1 : -1));

  const PER_PAGE = 15;
  const offset = currentPage * PER_PAGE;
  const currentPageData = sortedBooks.slice(offset, offset + PER_PAGE);
  const pageCount = Math.ceil(books.length / PER_PAGE);

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
              {currentPageData.map((book) => {
                return (
                  <tr className="adminProducttr" key={book.id}>
                    <td className="adminProducttd">
                      {book.id}: {book.title} {book.volume} {book.edition}
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
        <ReactPaginate
          previousLabel={"← Previous"}
          nextLabel={"Next →"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          previousLinkClassName={"pagination__link"}
          nextLinkClassName={"pagination__link"}
          disabledClassName={"pagination__link--disabled"}
          activeClassName={"pagination__link--active"}
        />
      </div>
    </div>
  );
}

export default AdminBooksPage;
