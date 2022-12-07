import React from "react";
import AdminNavbar from "./adminNavbar";

function AdminReviewsPage(props) {
  return (
    <div>
      <AdminNavbar />
      <ul>
        a list of all reviews will go here...
        <li>order 1 (user: moe)</li>
        <li>order 2 (user: lucy)</li>
      </ul>
    </div>
  );
}

export default AdminReviewsPage;
