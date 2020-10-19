import React, { useState, useEffect } from "react";
import axios from "axios";
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";

const ImagesGallery = () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    let shouldCancel = false;
    const call = async () => {
      const response = await axios.get(process.env.REACT_APP_API + "/glimpses");
      if (!shouldCancel && response.data && response.data.length > 0) {
        setImages(
          response.data.map((url) => ({
            original: `${url}=w1024`,
            thumbnail: `${url}=w100`,
          }))
        );
      }
    };
    call();
    return () => (shouldCancel = true);
  }, []);
  return images ? <ImageGallery items={images} /> : <div>None</div>;
};

export default ImagesGallery;
