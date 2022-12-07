import React from "react";
import AdminNavbar from "./adminNavbar";

function AdminBooksPage(props) {
  return (
    <div>
      <AdminNavbar />
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
