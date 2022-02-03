import React from "react";

const Image = (props) => {
  return (
    <div className={`image-cont ${props.class}`}>
      <div
        className={`image-card ${props.class} shadow-1 shadow`}
        style={{ backgroundColor: "#d9d9d9" }}
      >
        <img
          src={props.img}
          alt={`${props.name}`}
          className="image"
          height="100%"
        />
      </div>
      <div className="image-name shadow-1 shadow">
        {props.name}
        <br />
        {props.position && (
          <strong className="position">{props.position}</strong>
        )}
      </div>
    </div>
  );
};
export default Image;
