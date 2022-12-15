import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/userSlice.js";

import CartDrawer from "./cartView/CartDrawer.jsx";
import RouteContainer from "./RouteContainer.jsx";
import AdminNavbar from "./admin/adminNavbar.jsx";
import Footer from "./footer/Footer.jsx";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useSelector(state => state.user);
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
      <div className="upperBar">
        {/* <div className="searchBar"> search bar placeholder? </div> */}
        <p className="upperBarMessage">FREE SHIPPING on order over $50!</p>
      </div>
      <div className="main_header">
        <h1>Comic Overflow</h1>
      </div>

      <div>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/books">Books</Link>
          {!user.id && <Link to="/login">Login</Link>}
          {user.id && <Link to="/myAccount">My Account</Link>}
          <CartDrawer />
        </nav>
        {/* Render admin navbar is user is an admin */}
        {user.isAdmin && <AdminNavbar />}

        <RouteContainer user={user} />
        <Footer />
      </div>
    </div>
  );
};

export default App;
