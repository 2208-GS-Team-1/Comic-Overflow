import React from "react";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NavbarMyAccountLink() {
  const { user } = useSelector((state) => state.user);

  const flexStyle = {
    display: "flex",
    gap: "10px",
    alignItems: "center",
  };

  return (
    <Link to="/myAccount" style={flexStyle}>
      <Avatar
        alt={`${user.firstName} ${user.lastName}`}
        src={user.imageURL}
        sx={{
          height: 24,
          width: 24,
          border: `4px solid rgb(54, 54, 54)`,
        }}
      />
      My Account
    </Link>
  );
}

export default NavbarMyAccountLink;
