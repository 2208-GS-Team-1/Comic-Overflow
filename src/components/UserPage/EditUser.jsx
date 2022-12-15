/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userPage.css";
import { setUser } from "../../store/userSlice";
import { Alert } from "@mui/material";

const EditUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const id = user.id;
  const [address, setAddress] = useState(user.address);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setNumber] = useState(user.phoneNumber);

  const [errorMessage, setErrorMessage] = useState(false);
  const addressHandler = event => {
    setAddress(event.target.value);
  };
  const emailHandler = event => {
    setEmail(event.target.value);
  };
  const numberHandler = event => {
    setNumber(event.target.value);
  };

  const updateHandler = async event => {
    try {
      event.preventDefault();
      const updateData = { address, email, phoneNumber }; // this is our body to PUT with
      await axios.put(`/api/users/${id}`, updateData); // PUT req
      const userData = await axios.get(`/api/users/${id}`); // Refetch from backend
      dispatch(setUser(userData.data)); // dispatch to reflect changes
      navigate("/myAccount");
    } catch (err) {
      setErrorMessage(true);
    }
  };

  return (
    <div className="formBase">
      <div className="formDetail">
        <form onSubmit={updateHandler}>
          <h1>
            {user.firstName} {user.lastName}'s Account
          </h1>
          <div className="formInput">
            <p>Address:</p>
            <input
              className="editInput"
              value={address || ""}
              onChange={addressHandler}
            />

            <label>Email*:</label>
            <input
              className="editInput"
              value={email}
              required
              type="email"
              onChange={emailHandler}
            />

            <label>Phone Number:</label>
            <input
              className="editInput"
              value={phoneNumber || ""}
              onChange={numberHandler}
            />
            <button type="submit" className="accountButton">
              Submit
            </button>
            {errorMessage && (
              <Alert severity="error" sx={{ marginTop: "5px" }}>
                Error - An account with that email is already taken.
              </Alert>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
