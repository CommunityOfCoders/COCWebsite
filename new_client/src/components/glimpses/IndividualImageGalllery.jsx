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
          process.env.REACT_APP_API + "/glimpses",
          { gPhotosUrl }
        );
        if (!shouldCancel && response.data) {
          setImages(
            response.data.map((url) => ({
              original: `${url}=w512`,
              thumbnail: `${url}=w100`,
            }))
          );
        }
      } catch (e) {
        console.log(e.message);
        setImages([]);
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);

  return images.length > 0 ? <ImageGallery items={images} /> : <div>Please wait</div>;
}
