import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./adminNavbar";

function AdminOrdersPage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector(state => state.user);
  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  return (
    <div>
      <AdminNavbar />
      <ul>
        a list of all orders will go here...
        <li>order 1 (user: moe)</li>
        <li>order 2 (user: lucy)</li>
      </ul>
    </div>
  );
}

export default AdminOrdersPage;
