import React from "react";
import GSes from "../assets/coc-gses.webp";

const Image = (props) => {
  return (
    <div className={`image-cont ${props.class}`}>
      <div className={`image-card ${props.class}`}>
        <img src={props.img} className="image" height="100%" width="100%" />
      </div>
      <div className="image-name">{props.name}</div>
    </div>
  );
};
export default Image;
