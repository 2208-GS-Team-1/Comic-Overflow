import React from "react";
import CreateAccountForm from "./CreateAccountForm.jsx";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

function CreateAccountContainer() {
  const { user } = useSelector(state => state.user);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h2>Create an Account</h2>

      {/* If redux user exists (aka NOT an empty object), 
      tell them they can't make an account while logged in. */}
      {user.id ? (
        <>
          <Typography variant="body1">
            You cannot create a new account if you are already logged in.
          </Typography>
          <Typography variant="body1">Do you want to log out first?</Typography>
        </>
      ) : (
        // If not logged in, display form
        <CreateAccountForm />
      )}
    </Box>
  );
}

export default CreateAccountContainer;
