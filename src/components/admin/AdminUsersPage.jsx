import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../store/userSlice";
import "./admin.css";
import { Link } from "react-router-dom";
import { use } from "chai";

function AdminUsersPage() {
  // If they're not an admin don't let them see this component.
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.user);
  const allUsers = useSelector(state => state.user.allUsers);
  const dispatch = useDispatch();

  if (!user.isAdmin) return <h2>You are not an admin, permission denied</h2>;

  const allUserHandler = async () => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(setAllUsers(data));
      setLoading(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    allUserHandler();
  }, []);

  if (!loading) {
    return <div>Oops! Something went wrong!</div>;
  }

  return (
    <div>
      <div className="adminUserPage">
        <div>
          <h1>All Users List</h1>
        </div>
        <div className="adminUserContainer">
          <table className="adminUserTable">
            <tbody>
              {allUsers.map((user, index) => {
                return (
                  <tr className="adminUsertr" key={user.id}>
                    <td className="adminUsertd">
                      {index + 1}: {user.firstName} {user.lastName} {!user.isDeactivated ? "(Active)" : "(Deactivated)"}
                    </td>
                    <td className="adminUserButtons">
                      <Link to={`/admin/users/${user.id}`}>
                      <button>View/Edit</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminUsersPage;
