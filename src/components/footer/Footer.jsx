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

function Footer(props) {
  const container = {
    color: "white",
    backgroundColor: "rgb(54, 54, 54)",
    paddingTop: "3em",
    bottom: "0",
    width: "100%",
    // width: "100vw",
    padding: 1,
    marginTop: "25px",
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
  const noMargin = { margin: "0px" };
  const socialsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    justifyContent: "space-between",
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
          <p style={noMargin}>123 North East Street New York, NY, USA</p>

          <p>Tel: 342-123-4567</p>
        </div>

        <div className="footer-column" style={footerColumnStyle}>
          <h4>Links:</h4>
          <p style={noMargin}>Contact us</p>
          <p style={noMargin}>About us</p>
          <p style={noMargin}>FAQ</p>
          <p style={noMargin}>Terms of Service</p>
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
