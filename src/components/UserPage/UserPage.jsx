import { Avatar } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/cartSlice";
import { resetUser } from "../../store/userSlice";
import UserOrders from "../Orders/UserOrders";
import "./userPage.css";

// User can click on the 'my account' link to enter this page
// This page displays their info, an edit button (for their info), a logout button,
// and an order history component called UsersOrders
const UserPage = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigator = () => {
    navigate("/edit");
  };

  const logout = () => {
    localStorage.removeItem("token"); // delete their token
    dispatch(resetUser()); // clear redux user
    dispatch(clearCart()); // clear redux cart
    localStorage.setItem("cart", JSON.stringify([])); // empty local storage cart

    // On logout, redirect them to home
    navigate("/");
  };

  return (
    <div className="userAccount">
      <div className="accountDetail">
        <h1>Account Detail</h1>
        <div className="imageWrapper">
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={user.imageURL}
            sx={{
              height: 100,
              width: 100,
              border: `5px solid rgb(255, 216, 19)`,
            }}
          />
        </div>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Address: {user.address}</p>
        <p>Birthday: {user.birthday}</p>
        <p>Email: {user.email}</p>
        <p>Phone Number: {user.phoneNumber}</p>
        <div className="accountButton">
          <button onClick={navigator}>Edit</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      <div>
        <UserOrders />
      </div>
    </div>
  );
};

export default UserPage;
