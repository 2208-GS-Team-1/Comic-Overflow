/* eslint-disable react/prop-types */
import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./Home/Home.jsx";
import ErrorComponent from "../ErrorComponent.jsx";
import Login from "./login/Login";
import CreateAccountContainer from "./createAccount/CreateAccountContainer.jsx";
import AllBooks from "./Books/AllBooks.jsx";
import SingleProduct from "./SingleProduct/SingleProduct.jsx";
import UserPage from "./UserPage/UserPage.jsx";
import EditUser from "./UserPage/EditUser.jsx";

import AdminHomepage from "./admin/AdminHomepage.jsx";
// import AdminOrdersPage from "./admin/AdminOrdersPage";
import AdminBooksPage from "./admin/AdminBooksPage";
import AdminUsersPage from "./admin/AdminUsersPage";
// import AdminReviewsPage from "./admin/AdminReviewsPage";
import AdminBookEdit from "./admin/AdminBookEdit.jsx";

function RouteContainer({ user }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<AllBooks />} />
        <Route path="/books/:id" element={<SingleProduct />} />

        {/*only non-logged clients can go to login and createaccount route */}
        {!user.id && (
          <Route path="/createaccount" element={<CreateAccountContainer />} />
        )}
        {/* This route is exposed to all because, if we have it 404 for logged in users, 
        for a brief second, while login is processing, it shows a 404 */}
        <Route path="/login" element={<Login />} />

        {/*only logged in user will be able to access my account and account edit page */}
        {user.id && <Route path="/myAccount" element={<UserPage />} />}
        {user.id && <Route path="/edit" element={<EditUser />} />}

        {user.isAdmin && (
          <>
            <Route path="/admin" element={<AdminHomepage />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
            <Route path="/admin/books" element={<AdminBooksPage />} />
            <Route path="/admin/books/:id" element={<AdminBookEdit />} />
            {/* Not implemented yet, so commented out: */}
            {/* <Route path="/admin/reviews" element={<AdminReviewsPage />} />
            <Route path="/admin/orders" element={<AdminOrdersPage />} /> */}
          </>
        )}

        <Route path="/404" element={<ErrorComponent />} />
        <Route path="/*" element={<ErrorComponent />} />
      </Routes>
    </div>
  );
}

export default RouteContainer;
