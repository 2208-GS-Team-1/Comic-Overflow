import React, { useEffect } from "react";
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
import AdminHomepage from "./admin/AdminHomepage.jsx";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../store/userSlice.js";
import CartView from "./cartView/CartView.jsx";


const App = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const loginWithToken = async () => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const response = await axios.get("/api/auth", {
        headers: {
          authorization: token,
        },
      });

      dispatch(setUser(response.data));
    }
  };

  useEffect(() => {
    loginWithToken();
  }, []);

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
          <Route path="/edit" element = {<EditUser />} />
          <Route path="/admin" element={<AdminHomepage />} />
          <Route path="/usercart" element={<CartView />} />

        </Routes>
      </div>
    </div>
  );
};

export default App;
