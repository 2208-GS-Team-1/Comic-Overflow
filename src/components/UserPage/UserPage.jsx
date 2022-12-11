import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./userPage.css";

const UserPage = () => {
  //user can click on the account link to enter this page
  // here, user will be able to update their info
  const user = useSelector(state => state.user.user);
  const id = user.id;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const userHandler = async () => {
    // eslint-disable-next-line no-unused-vars
    const userData = await axios.get(`/api/users/${id} `);
    setLoading(true);
  };

  const navigator = () => {
    navigate("/edit");
  };

  useEffect(() => {
    userHandler();
  }, []);

  if (loading) {
    return (
      <div className="userAccount">
        <div className="accountDetail">
          <h1>Account Detail</h1>
          <p>
            Name: {user.firstName} {user.lastName}
          </p>
          <p>Address: {user.address}</p>
          <p>Birthday: {user.birthday}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {user.phoneNumber}</p>
          <div className="accountButton">
            <button onClick={navigator}>Edit</button>
            <button onClick={() => navigate("/admin")}>Admin Page</button>
          </div>
        </div>
      </div>
    );
  }
};

export default UserPage;
