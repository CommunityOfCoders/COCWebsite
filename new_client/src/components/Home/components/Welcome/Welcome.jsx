import React from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import "./Welcome.scss";
import COC from "../../../assets/coc_dark.webp";
import { Button } from "@material-ui/core";

const Welcome = (props) => {
  const executeScroll = () => props.scrollToRef.current.scrollIntoView();

  return (
    <section className="Welcome">
      <div className="welcome-background-container">
        <div className="welcome-container">
          <div className="welcome-content">
            <Slogan width={props.width} />
            <p className="welcome-description">
              Learn something new at an event, form a team to build a project
              with, or find out more about the field! Community Of Coders, VJTI
              welcomes you, regardless of your programming experience or your
              skill set.
            </p>
            <div className="welcome-action-buttons" onClick={executeScroll}>
              <a className="learn-more">Learn More</a>
            </div>
          </div>

          <div className="welcome-slideshow">
            <img className="slideshow" src={COC} alt="Slideshow" />
          </div>
        </div>
      </div>
    </section>
  );
};

const Slogan = (props) => {
  if (window.document.documentMode) {
    console.log("Internet Explorer detected, disabling typewriter effect.");
    return (
      // eslint-disable-next-line
      <span className="Slogan" role="text">
        <h1 className="SloganBeginning">
          For the juniors, by&nbsp;
          <span id="welcome-typewriter-placeholder">the seniors.</span>
        </h1>
      </span>
    );
  } else {
    return (
      // eslint-disable-next-line
      <span className="Slogan" role="text">
        <SloganBeginning width={props.width}>
          <TypewriterWelcome />
        </SloganBeginning>
      </span>
    );
  }
};

const SloganBeginning = (props) => {
  // <= 370 (small phones)
  if (props.width <= 370) {
    return (
      <h1 className="SloganBeginning">
        For the juniors, by&nbsp;{props.children}
      </h1>
    );
    // <= 600px (larger phones)
  } else if (props.width <= 600) {
    return (
      <h1 className="SloganBeginning">
        For the juniors,
        <br />
        by&nbsp;
        {props.children}
      </h1>
    );
    // <= 910px (tablets and landscape phones)
  } else if (props.width <= 910) {
    return (
      <h1 className="SloganBeginning">
        For the juniors, by
        <br />
        {props.children}
      </h1>
    );
  } else {
    // > 910px (larger tablets and laptops)
    return (
      <h1 className="SloganBeginning">
        For the juniors,
        <br />
        by&nbsp;
        {props.children}
      </h1>
    );
  }
};

const TypewriterWelcome = () => {
  // useEffect(() => {
  //   console.log('New typewriter created');
  //   return () => {
  //     console.log('Cleaning up typewriter');
  //   };
  // }, []);

  // Strings for the typewriter effect to cycle through
  const strings = ["the seniors.", "your mentors.", "your teammates."];

  const typewriterInit = (typewriter) => {
    document.getElementById("welcome-typewriter-placeholder").remove();
    const typeString = (string, pauseTime) => {
      typewriter.typeString(string).pauseFor(pauseTime).deleteAll(30);
    };

    for (const string of strings) {
      typeString(string, 2500);
      // TODO: Slideshow with club images
    }

    typewriter.start();
  };

  return (
    <span className="TypewriterWelcome">
      <span id="welcome-typewriter-placeholder">inspiration.</span>
      <Typewriter
        options={{
          autoStart: true,
          loop: true,
          delay: 30,
          deleteSpeed: 30,
        }}
        onInit={(typewriter) => typewriterInit(typewriter)}
      />
    </span>
  );
};

export default Welcome;
