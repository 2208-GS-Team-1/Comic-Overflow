import React from "react";
import AdminNavbar from "./adminNavbar";

function adminAllUsers(props) {
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

export default adminAllUsers;
