import React from "react";
import AdminNavbar from "./adminNavbar";

function adminAllOrders(props) {
  return (
    <div>
      <AdminNavbar />a list of all orders will go here...
      <ul>
        <li>order 1 (user: moe)</li>
        <li>order 2 (user: lucy)</li>
      </ul>
    </div>
  );
}

export default adminAllOrders;
