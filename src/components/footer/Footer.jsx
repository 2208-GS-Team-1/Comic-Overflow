import React from "react";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import {
  FaCcAmex,
  FaCcDiscover,
  FaCcMastercard,
  FaCcStripe,
  FaCcVisa,
  FaPaypal,
} from "react-icons/fa";
import { Typography } from "@mui/material";

function Footer() {
  const container = {
    marginTop: "auto",
    color: "white",
    backgroundColor: "rgb(54, 54, 54)",
    paddingTop: "3em",
    bottom: "0",
    width: "100%",
    padding: 1,
  };
  const footerRowStyle = {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "flex-start",
  };
  const footerColumnStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 1,
    padding: "20px",
  };

  const paymentIconContainerStyle = {
    display: "flex",
    gap: "10px",
    justifyContent: "space-between",
    fontSize: "24px",
  };
  return (
    <div style={container}>
      <div className="footer-row" style={footerRowStyle}>
        <div className="footer-column" style={footerColumnStyle}>
          <p>Store Location: </p>
          <Typography variant="body1">123 North East Street</Typography>
          <Typography variant="body1">New York, NY, USA</Typography>
          <Typography variant="body1">Tel: 342-123-4567</Typography>
        </div>

        <div className="footer-column" style={footerColumnStyle}>
          <p>Links:</p>
          <Typography variant="body1"> Contact Us </Typography>
          <Typography variant="body1"> About Us </Typography>
          <Typography variant="body1"> FAQ </Typography>
          <Typography variant="body1"> Terms of Service </Typography>
        </div>

        <div className="socials-container" style={footerColumnStyle}>
          <p>Socials:</p>
          <Facebook fontSize="large" />
          <Twitter fontSize="large" />
          <Instagram fontSize="large" />
        </div>
      </div>

      <div
        className="footer-row"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",

          alignItems: "center",
        }}
      >
        <div className="payment-icons" style={paymentIconContainerStyle}>
          <FaPaypal />
          <FaCcMastercard />
          <FaCcVisa />
          <FaCcDiscover />
          <FaCcAmex />
          <FaCcStripe />
        </div>
        <p>
          © 2022 Comic Overflow | Powered by Full Stack Academy Web Dev - Part
          Time - 2208 - Grace Shopper Team 1
        </p>
      </div>
    </div>
  );
}

export default Footer;
