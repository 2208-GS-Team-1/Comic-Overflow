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
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState(
    "http://dummyimage.com/400x400.png/dddddd/000000"
  );
  const [genre, setGenre] = useState(null);
  const [volume, setVolume] = useState(null);
  const [yearOfPublish, setYOP] = useState(null);
  const [isbn, setIsbn] = useState(null);
  const [edition, setEdition] = useState("");
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [isDeactivated, setIsDeactivated] = useState(false);

  const titleHandler = (event) => {
    setTitle(event.target.value);
  };
  const authorHandler = (event) => {
    setAuthor(event.target.value);
  };
  const descriptionHandler = (event) => {
    setDescription(event.target.value);
  };
  const imageHandler = (event) => {
    setImageURL(event.target.value);
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
    const val = Math.max(0, Number(event.target.value));
    setPrice(val);
  };
  const stockHandler = (event) => {
    const val = Math.max(0, Number(event.target.value));
    setStock(val);
  };
  const deactivatedHandler = (event) => {
    setIsDeactivated(event.target.value);
  };

  const bookAdd = async (event) => {
    event.preventDefault();
    const addBook = {
      title,
      author,
      description,
      imageURL,
      genre,
      volume,
      yearOfPublish,
      isbn,
      edition,
      price,
      stock,
      isDeactivated,
    };
    console.log("this is the new book object", addBook);
    try {
      //create new book
      await axios.post("/api/books", addBook);
      //get all books from db
      const newBooks = await axios.get("/api/books");
      //dispatch newBooks to redux
      dispatch(setBooks(newBooks.data));
      // navigate admin back to the list of all books
      navigate("/admin/books");
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
            <label htmlFor="title">Title*</label>
            <input
              required
              id="title"
              className="editInput"
              placeholder="Title"
              onChange={titleHandler}
            />
            <label htmlFor="author">Author*</label>
            <input
              required
              id="author"
              className="editInput"
              placeholder="Author"
              onChange={authorHandler}
            />
            <label htmlFor="description">Description*</label>
            <textarea
              required
              rows="10"
              id="description"
              className="editInput"
              placeholder="Enter description here"
              onChange={descriptionHandler}
            />
            <label htmlFor="image">URL</label>
            <input
              id="imageURL"
              className="editInput"
              placeholder="Image URL"
              onChange={imageHandler}
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
              type="number"
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
            <label htmlFor="price">Price in Cents*</label>
            <input
              required
              type="number"
              id="price"
              className="editInput"
              placeholder="Price in Cents"
              value={price}
              onChange={priceHandler}
            />
            <label htmlFor="stock">Stock*</label>
            <input
              required
              value={stock}
              type="number"
              id="stock"
              className="editInput"
              placeholder="Stock"
              onChange={stockHandler}
            />
            <label htmlFor="isDeactivated">Is Deactivated</label>
            <select
              type="boolean"
              id="isDeactivated"
              className="editInput"
              onChange={deactivatedHandler}>
              <option value="false">False</option>
              <option value="true">True</option>
            </select>
            <button
              type="submit"
              disabled={!title || !author || !price || !stock || !description}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminBookAdd;
