import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "./Slider.jsx";
import "./homeStyle.css";

const Home = () => {
  // eslint-disable-next-line no-unused-vars
  const { user } = useSelector(state => state.user);
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch();

  // Below codes been blocked out FOR NOW //

  //   const logout = () => {
  //     window.localStorage.removeItem("token");
  //     dispatch(resetUser());
  //   };

  return (
    <div>
      <div>
        <Slider />
        {/* <button onClick={logout}>Logout</button> */}
      </div>
    </div>
  );
};

export default Home;
