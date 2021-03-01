import React from "react";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";

export default function BackButton({ link }) {
  return (
    <div style={{ margin: "10px" }}>
      <span>
        <Link to={link} style={{ color: "black" }}>
          <ArrowBackIcon fontSize="large" /> Go Back
        </Link>
      </span>
    </div>
  );
}
