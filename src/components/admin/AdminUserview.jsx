import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { Avatar } from "@mui/material";
import AdminUserEdit from "./AdminUserEdit";

const AdminUserview = () => {
  const { id } = useParams();
  const [fetchedUser, setFetchedUser] = useState({});
  const [loading, setLoading] = useState(false);

  const userHandler = async () => {
    try {
      // JWT & authorization header to give for authorization check in the API
      const token = window.localStorage.getItem("token");
      const config = { headers: { authorization: "Bearer " + token } };
      const user = await axios.get(`/api/users/${id}`, config);
      setFetchedUser(user.data);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userHandler();
  }, []);

  if (!loading) {
    return <div>Oops! Something went wrong!</div>;
  }

  return (
    <div className="adminsUserEditPage">
      <div className="userAccount">
        <div className="accountDetail">
          <h1>Account Detail</h1>
          <div className="imageWrapper">
            <Avatar
              alt={`${fetchedUser.firstName} ${fetchedUser.lastName}`}
              src={fetchedUser.imageURL}
              sx={{
                height: 100,
                width: 100,
                border: `5px solid rgb(255, 216, 19)`,
              }}
            />
          </div>
          <p>
            Name: {fetchedUser.firstName} {fetchedUser.lastName}
          </p>
          <p>Address: {fetchedUser.address}</p>
          <p>Birthday: {fetchedUser.birthday}</p>
          <p>Email: {fetchedUser.email}</p>
          <p>Phone Number: {fetchedUser.phoneNumber}</p>
        </div>
      </div>
      <AdminUserEdit fetchedUser={fetchedUser} userHandler={userHandler} />
    </div>
  );
};

export default AdminUserview;
