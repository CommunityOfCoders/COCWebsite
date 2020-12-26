// @flow
import React from 'react';
import './Banner.scss'
import photo from '../assets/banner.jpeg'

const Banner = () => {
  return (
    <section className="Banner">
      <div className="banner-photo">
        <img className="photo" src={photo} alt="photo" />
        <div className="banner-center">Community of Coders</div>
        <div className="banner-text"> IMAGINE &nbsp; &nbsp; &nbsp; BELIEVE &nbsp; &nbsp; &nbsp; ACHIEVE</div>
      </div>
    </section>
  );
};

export default Banner;
