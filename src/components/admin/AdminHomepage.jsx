import React from "react";
import { useSelector } from "react-redux";

function AdminHomepage(props) {
  const { user } = useSelector(state => state.user);
  console.log(user);
  console.log(`user.isAdmin: ${user.isAdmin}`);

  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;
  return (
    <div>
      <h1>Welcome admin!</h1>
      <p>What would you like to interact with</p>
      <button>Users</button>
      <button>Books</button>
    </div>
  );
}

export default AdminHomepage;
