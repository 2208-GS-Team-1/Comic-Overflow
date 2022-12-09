import React, { useEffect } from "react";
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
import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminBooksPage from "./admin/AdminBooksPage";
import AdminUsersPage from "./admin/AdminUsersPage";
import AdminReviewsPage from "./admin/AdminReviewsPage";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../store/userSlice.js";
import CartView from "./cartView/CartView.jsx";
import CartDrawer from "./cartView/CartDrawer.jsx";

const App = () => {
  // eslint-disable-next-line no-unused-vars
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
          <CartDrawer />
        </nav>

        {/* Render admin navbar is user is an admin */}
        {/* {user.isAdmin && <AdminNavbar />} */}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<AllBooks />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createaccount" element={<CreateAccountContainer />} />
          <Route path="/myAccount" element={<UserPage />} />
          <Route path="/books/:id" element={<SingleProduct />} />
          <Route path="/edit" element={<EditUser />} />
          <Route path="/usercart" element={<CartView />} />
          <Route path="/admin" element={<AdminHomepage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/books" element={<AdminBooksPage />} />
          <Route path="/admin/reviews" element={<AdminReviewsPage />} />
          <Route path="/admin/orders" element={<AdminOrdersPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
