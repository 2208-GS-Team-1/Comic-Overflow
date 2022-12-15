import React from "react";
import Slider from "./Slider.jsx";
import "./homeStyle.css";
import StoreOpenBanner from "../storeOpenBanner/StoreOpenBanner.jsx";

const Home = () => {
  return (
    <div>
      <div>
        <Slider />
        <StoreOpenBanner />
      </div>
    </div>
  );
};

export default Home;
