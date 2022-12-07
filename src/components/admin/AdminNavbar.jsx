import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  const adminNavBarStyle = {
    color: "white",
    backgroundColor: "rgb(54, 54, 54)",
  };
  const adminLinkStyle = { color: "white" };

  return (
    <nav className="navbar" style={adminNavBarStyle}>
      <h2>Admin Pane:</h2>
      <Link to="/admin/allUsers" style={adminLinkStyle}>
        Customers
      </Link>
      <Link to="/admin/allBooks" style={adminLinkStyle}>
        Products
      </Link>
      <Link to="/admin/allOrders" style={adminLinkStyle}>
        Orders
      </Link>
    </nav>
  );
}

export default AdminNavbar;
