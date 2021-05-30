import React from "react";
import GSes from "../assets/coc-gses.webp";

const Image = (props) => {
  return (
    <div class={`image-cont ${props.class}`}>
      <div class={`image-card ${props.class}`}>
        <img src={props.img} class="image" height="100%" width="100%" />
      </div>
      <div class="image-name">{props.name}</div>
    </div>
  );
};
export default Image;
