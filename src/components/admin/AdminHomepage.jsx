import React from "react";
import { useSelector } from "react-redux";

function AdminHomepage(props) {
  const user = useSelector(state => state.user);

  console.log(user);

  console.log(user.isAdmin);
  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;
  return <div>Welcome admin!</div>;
}

export default AdminHomepage;
