import React from "react";
// import Home from './Home';
import Home from "./Home/Home.jsx";
import { Link, Routes, Route } from "react-router-dom";
// import Books from './Books.jsx';
import Login from "./login/Login";
import CreateAccountContainer from "./createAccount/CreateAccountContainer.jsx";
import AllBooks from "./Books/AllBooks.jsx";
import SingleProduct from "./SingleProduct/SingleProduct.jsx";
import UserPage from "./UserPage/UserPage.jsx";
import EditUser from "./UserPage/EditUser.jsx";

const App = () => {
  return (
    <div>
      <div className="main_header">
        <h1>Comic Overflow</h1>
      </div>

      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          <Link to="/login">Log-In</Link>
          <Link to="/createaccount">Create Account</Link>
          <Link to="/myAccount">My Account</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccountContainer />} />
          <Route path="/myAccount" element={<UserPage />} />
          <Route path="/books/:id" element={<SingleProduct />} />
          <Route path="/myAccount/edit" element = {<EditUser />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
