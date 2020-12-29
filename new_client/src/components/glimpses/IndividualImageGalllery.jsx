import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
import axios from "axios";
import Spinner from "../spinner/Spinner";

export default function IndividualImageGalllery(props) {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const {
    location: {
      state: { albumPath },
    },
  } = props;

  useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      try {
        const response = await axios.post(
          process.env.REACT_APP_API + "/glimpses",
          { gPhotosUrl: albumPath }
        );
        if (!shouldCancel && response.data) {
          setImages(
            response.data.map((url) => ({
              original: `${url}=w512`,
              thumbnail: `${url}=w100`,
            }))
          );
          setIsLoading(false);
        }
      } catch (e) {
        console.log(e.message);
        setImages([]);
        setIsLoading(false);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  return (
    <React.Fragment>
      {images.length > 0 ? <ImageGallery items={images} /> : <Spinner />}
    </React.Fragment>
  );
}
