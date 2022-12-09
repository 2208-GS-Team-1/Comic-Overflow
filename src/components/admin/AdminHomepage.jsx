import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./adminNavbar";

function AdminHomepage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector(state => state.user);
  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  return (
    <div>
      <AdminNavbar />
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
