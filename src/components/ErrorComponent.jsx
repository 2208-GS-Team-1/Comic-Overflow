import { Typography } from "@mui/material";
import React from "react";

function ErrorComponent() {
  const errorDivStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
  };
  return (
    <div style={errorDivStyle}>
      <Typography variant="h2">404</Typography>
      <h2>Page does not exist</h2>
    </div>
  );
}

export default ErrorComponent;
