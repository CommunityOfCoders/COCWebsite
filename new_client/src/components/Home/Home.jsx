import React, { useEffect, useRef, useState } from "react";
import Banner from "./components/Banner/Banner";
import Welcome from "./components/Welcome/Welcome";
import Description from "./components/Description/Description";
import Highlights from "./components/Highlights/Highlights";
import Achievements from "./components/Achievements/Achievements";
import "./Home.scss";

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

  const scrollToRef = useRef(null);

  return (
    <div className="Home">
      <article>
        <Banner width={width} />
        <Welcome width={width} scrollToRef={scrollToRef} />
        <Description width={width} scrollToRef={scrollToRef} />
        <Highlights />
        <Achievements />
      </article>
    </div>
  );
};

export default Home;
