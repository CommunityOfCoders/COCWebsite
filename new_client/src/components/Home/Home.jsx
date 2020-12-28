// @flow
import React, { useEffect, useState } from 'react';
import Banner from './components/Banner'
import Welcome from './components/Welcome';
import Description from './components/Description';
import Highlights from './components/Highlights';

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  return (
    <div className="Home">
      <article>
        <Banner width={width} />
        <Welcome width={width} />
        <Description width={width} />
        <Highlights />
      </article>
    </div>
  );
};

export default Home;
