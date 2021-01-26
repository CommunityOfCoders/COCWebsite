import React from "react";
import "../../../Utilities/Banner.scss";
import COC from "../../../assets/COC.webp";
import {Image, Placeholder} from 'cloudinary-react';

const Banner = () => {
  return (
    <section className="homeBanner">
      	<Image 
			cloudName="coc-vjti" 
			publicId="https://res.cloudinary.com/coc-vjti/image/upload/v1611151381/banner_tur7dr.webp" 
			dpr="auto"
			responsive
			width="auto"
			crop="scale"
			responsiveUseBreakpoints="true">
			
			<Placeholder type="pixelate" />
		</Image>
      <div className="banner-center">
        <img src={COC} style={{ width: 60, height: 60 }} alt="COC Logo PNG" />{" "}
        Community of Coders
      </div>
      <div className="banner-text">
        &nbsp; IMAGINE &nbsp; | &nbsp; BELIEVE &nbsp; | &nbsp; ACHIEVE &nbsp;
      </div>
    </section>
  );
};

export default Banner;
