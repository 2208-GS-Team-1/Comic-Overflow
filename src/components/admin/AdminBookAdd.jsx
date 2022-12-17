import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBooks } from "../../store/bookSlice";

const AdminBookAdd = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [description, setdescription] = useState("");
  const [genre, setGenre] = useState("");
  const [volume, setVolume] = useState("");
  const [yearOfPublish, setYOP] = useState("");
  const [isbn, setIsbn] = useState("");
  const [edition, setEdition] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isDeactivated, setStatus] = useState("");

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const descriptionHandler = (event) => {
    setdescription(event.target.value);
  };
  const genreHandler = (event) => {
    setGenre(event.target.value);
  };
  const volumeHandler = (event) => {
    setVolume(event.target.value);
  };
  const yopHandler = (event) => {
    setYOP(event.target.value);
  };
  const isbnHandler = (event) => {
    setIsbn(event.target.value);
  };
  const editionHandler = (event) => {
    setEdition(event.target.value);
  };
  const priceHandler = (event) => {
    setPrice(event.target.value);
  };
  const stockHandler = (event) => {
    setStock(event.target.value);
  };
  const statusHandler = (event) => {
    setStatus(event.target.value);
  };

  const bookAdd = async (event) => {
    event.preventDefault();
    const addBook = {
      title,
      author,
      description,
      genre,
      volume,
      yearOfPublish,
      isbn,
      edition,
      price,
      stock,
      isDeactivated,
    };
    try {
      //create new book
      await axios.post("/api/books/", addBook);
      //get all books from db
      const newBooks = await axios.get("/api/books/");
      //dispatch newBooks to redux
      dispatch(setBooks(newBooks.data));
      // navigate admin back to the list of all books
      navigate(`/admin/books`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="formBase">
      <div className="formDetail">
        <form onSubmit={bookAdd}>
          <h1>Add Product</h1>
          <div className="formInput">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              className="editInput"
              placeholder="Title"
              onChange={titleHandler}
            />
            <label htmlFor="author">Author</label>
            <input
              id="author"
              className="editInput"
              placeholder="Author"
              onChange={authorHandler}
            />
            <label htmlFor="description">Description</label>
            <textarea
              rows="10"
              id="description"
              className="editInput"
              placeholder="Enter description here"
              onChange={descriptionHandler}
            />
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              className="editInput"
              placeholder="Genre"
              onChange={genreHandler}
            />
            <label htmlFor="volume">Volume</label>
            <input
              id="volume"
              className="editInput"
              placeholder="Volume"
              onChange={volumeHandler}
            />
            <label htmlFor="yop">Year of Publishing</label>
            <input
              id="yop"
              className="editInput"
              placeholder="Year of Publish"
              onChange={yopHandler}
            />
            <label htmlFor="isbn">ISBN</label>
            <input
              id="isbn"
              className="editInput"
              placeholder="isbn"
              onChange={isbnHandler}
            />
            <label htmlFor="edition">Edition</label>
            <input
              id="edition"
              className="editInput"
              placeholder="Edition"
              onChange={editionHandler}
            />
            <label htmlFor="price">Price in cents</label>
            <input
              id="price"
              className="editInput"
              placeholder="$0.00"
              onChange={priceHandler}
            />
            <label htmlFor="stock">Stock</label>
            <input
              id="stock"
              className="editInput"
              placeholder="Stock"
              onChange={stockHandler}
            />
            <label htmlFor="status">Deactivation status</label>
            <input
              id="status"
              className="editInput"
              placeholder="true"
              onChange={statusHandler}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBookAdd;
