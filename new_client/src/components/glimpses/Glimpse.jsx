import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import { Container, Grid } from "@material-ui/core";
import IndividualGlimpse from "./IndividualGlimpse";
import IndividualImageGalllery from "./IndividualImageGalllery";

const Glimpse = () => {
  const [counter, setCounter] = useState(0);
  const [gPhotosURL, setGPhotosURL] = useState("");
  const [glimpses, setGlimpses] = useState([]);

  useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      try {
        const response = await axios.get(
          process.env.REACT_APP_API + "/glimpses"
        );
        if (!shouldCancel && response.data && response.data.data.length > 0) {
          setGlimpses(
            // response.data.map((url) => ({
            //   original: `${url}=w1024`,
            //   thumbnail: `${url}=w100`,
            // }))
            response.data.data
          );
        }
      } catch (e) {
        console.log(e.message);
        setGlimpses([]);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);
  // return images ? <>{console.log()}<ImageGallery items={images} /></> : <div>None</div>;
  return counter === 0 ? (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {glimpses.map((glimpse) => (
          <Grid item xs={6} md={6} lg={4} key={glimpse._id}>
            <IndividualGlimpse
              imgSrc={glimpse.preview}
              title={glimpse.eventName}
              albumPath={glimpse.albumPath}
              setCounter={setCounter}
              setGPhotosURL={setGPhotosURL}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <IndividualImageGalllery gPhotosUrl={gPhotosURL} />
  );
};

export default Glimpse;
