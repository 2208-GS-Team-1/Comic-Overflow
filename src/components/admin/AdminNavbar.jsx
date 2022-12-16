import React from "react";
import { Link } from "react-router-dom";

function AdminNavbar() {
  const adminNavBarLargeStyle = {
    color: "white",
    backgroundColor: "rgb(54, 54, 54)",
    fontSize: "1.5em",
  };
  const adminNavBarStyle = {
    color: "white",
    backgroundColor: "rgb(54, 54, 54)",
  };
  const adminLinkStyle = { color: "white" };

  return (
    <nav className="navbar" style={adminNavBarStyle}>
      <Link to="/admin" style={adminNavBarLargeStyle}>
        Admin Pane:
      </Link>
      <Link to="/admin/users" style={adminLinkStyle}>
        Users
      </Link>
      <Link to="/admin/books" style={adminLinkStyle}>
        Products
      </Link>
      {/* If we have time we can write these routes, but for now, commented out. */}
      {/* <Link to="/admin/reviews" style={adminLinkStyle}>
        Reviews
      </Link>
      <Link to="/admin/orders" style={adminLinkStyle}>
        Orders
      </Link> */}
    </nav>
  );
}

export default AdminNavbar;
