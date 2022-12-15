import React from "react";

function StoreOpenBanner() {
  const bannerStyle = {
    margin: "20px",
    // width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const imgStyle = {};
  return (
    <div style={bannerStyle}>
      <img
        alt="banner promoting our store's grand opening"
        src="/static/store-open.jpg"
      />
    </div>
  );
}

export default StoreOpenBanner;
