import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";

function AdminHomepage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector(state => state.user);

  return (
    <div>
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <h1>Welcome admin {user.username}!</h1>
        <p>What would you like to interact with?</p>
      </Box>
    </div>
  );
}

export default AdminHomepage;
