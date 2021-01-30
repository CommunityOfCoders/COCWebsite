import React, { useEffect, useState } from "react";
import Banner from "./components/Banner/Banner";
import Welcome from "./components/Welcome/Welcome";
import Description from "./components/Description/Description";
import Highlights from "./components/Highlights/Highlights";

const Home = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
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
