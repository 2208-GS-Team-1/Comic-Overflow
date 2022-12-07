import React from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "./adminNavbar";

function AdminBooksPage() {
  // If they're not an admin don't let them see this component.
  const { user } = useSelector(state => state.user);
  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  return (
    <div>
      <AdminNavbar props={user} />
      <div>Maybe here will be a component to create a new book.</div>
      Below will be a list of all books... maybe they will be links to more info
      on them, and from there you can edit or delete.
      <ul>
        <li>devilman vol 1</li>
        <li>wonder woman vol 89</li>
      </ul>
    </div>
  );
}

export default AdminBooksPage;
