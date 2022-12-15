import React from "react";

function StoreOpenBanner() {
  const bannerStyle = {
    margin: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

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
