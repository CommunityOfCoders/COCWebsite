import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import axios from "axios";

export default function IndividualImageGalllery({ gPhotosUrl }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      try {
        const response = await axios.post(
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
}
