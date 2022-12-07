import React from "react";
import AdminNavbar from "./adminNavbar";

function AdminOrdersPage() {
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
