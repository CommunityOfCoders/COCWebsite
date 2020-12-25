// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import './Highlight.scss';

const Highlight = (props) => {
  return (
    <div
      className="Highlight"
      style={{ backgroundColor: props.backgroundColor }}
    >
      <div className={`highlight-container ${props.containerClass}`}>
        <div className="highlight-content">
          <h2>{props.title}</h2>
          <p>{props.description}</p>
          <Link to={props.linkUrl}>{props.linkText} →</Link>
        </div>
        <img
          className="highlight-image"
          src={props.image}
          alt={props.imageAlt}
        />
      </div>
    </div>
  );
};

export default Highlight;
