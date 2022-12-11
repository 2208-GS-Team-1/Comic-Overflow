import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "./adminNavbar";

function AdminUsersPage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  return (
    <div>
      <AdminNavbar />
      <div>Maybe here will be a component to create a new user.</div>
      Below will be a list of all users... maybe they will be links to more info
      on them, and from there you can edit or delete.
      <ul>
        <li>moe</li>
        <li>lucy</li>
      </ul>
    </div>
  );
}

export default AdminUsersPage;
