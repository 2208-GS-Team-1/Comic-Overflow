import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setAllUsers } from "../../store/userSlice";
import "./admin.css";
import { Link } from "react-router-dom";
import MuiLoader from "../MuiLoader";


function AdminUsersPage() {
  // If they're not an admin don't let them see this component.
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(state => state.user);
  const allUsers = useSelector(state => state.user.allUsers);
  const [currentPage, setCurrentPage] = useState(0);
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

  // PAGINATE LOGIC
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }

  const PER_PAGE = 15;
const offset = currentPage * PER_PAGE;
const currentPageData = allUsers
.slice(offset, offset + PER_PAGE)
const pageCount = Math.ceil(allUsers.length / PER_PAGE);
  //
  useEffect(() => {
    allUserHandler();
  }, []);

  if (!loading) {
    return  (
    <div className="loadingContainer">
        <MuiLoader />
      </div>
    )     
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
              {currentPageData.map((user, index) => {
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
      <ReactPaginate
      previousLabel={"← Previous"}
      nextLabel={"Next →"}
      pageCount={pageCount}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination__link"}
      nextLinkClassName={"pagination__link"}
      disabledClassName={"pagination__link--disabled"}
      activeClassName={"pagination__link--active"}
    />
      </div>
    </div>
  );
}

export default AdminUsersPage;
