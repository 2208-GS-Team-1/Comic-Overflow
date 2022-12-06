import React from "react";
import CreateAccountForm from "./CreateAccountForm.jsx";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

function CreateAccountContainer() {
  const { user } = useSelector(state => state.user);

  console.log(user);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Create an Account</h2>
      <h4>
        Create an account and take advantage of a faster checkout and other
        benefits.
      </h4>

      {/* If redux user exists (aka NOT an empty object), tell them they can't make an account while logged in. */}
      {/* Else, display form */}
      {Object.keys(user).length ? (
        <p>
          You cannot create a new account if you are already logged in. Do you
          want to log out first?
        </p>
      ) : (
        <CreateAccountForm />
      )}
    </Box>
  );
}

export default CreateAccountContainer;
