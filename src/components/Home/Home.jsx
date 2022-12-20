import React, { useEffect, useState } from "react";
import Slider from "./Slider.jsx";
import Popup from "../Popup.jsx";
import "./homeStyle.css";
import StoreOpenBanner from "../storeOpenBanner/StoreOpenBanner.jsx";

const Home = () => {

  const [ popTrigger, setPopTrigger] = useState(false);
  useEffect(()=>{
    setTimeout( ()=>{setPopTrigger(true)}, 1500);
  }, [])

  return (
    <div>
      <div>
        <Slider />
        <Popup trigger= {popTrigger} setPopTrigger = {setPopTrigger} />
        <StoreOpenBanner />
      </div>
    </div>
  );
};

export default Home;
