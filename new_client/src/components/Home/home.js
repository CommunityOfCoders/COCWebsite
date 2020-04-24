import React from 'react';

// Pictures imported
import hero from './hero.jpeg'
import section from './section.jpg'

// Templates imported
import './home.css';

export default function Home() {
  return (
    // This is the homepage
      <div className="Home"> {/* Home */}

        {/* This is the code for inside the image of hero */}
        <div className="hero">
          <img src={hero}  alt = ""className="white--text mb-2 display-1 text-center" width="100%" height="650px"></img>
          <div  className="centered">Community Of Coders </div>
          <div className="centered2" >
            <h4>Community Of Coders</h4>
            <h6>Good software, like wine, takes time ~ Joel Spolsky</h6>
          </div>
        </div>    {/* hero */}

      {/* This is for the text between hero and section */}
      <div className="main1">
      
        The best way to start developing<br/> A computer program does what you tell it to do, not what you want it to do.

        {/* This is for dividing the coloumn into 3 parts and their text */}
        <div className="row1">
          <div className="column1" >
            <h2>Coding Workshop</h2>
            <p>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt   ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada  fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus   bibendum tincidunt. Suspendisse potenti.</p>
          </div>

          <div className="column1" >
            <h2>Mentorship Programs</h2>
            <p>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt   ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada  fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus   bibendum tincidunt. Suspendisse potenti.</p>
          </div>

          <div className="column1">
            <h2>Projects</h2>
            <p>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt   ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada  fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus   bibendum tincidunt. Suspendisse potenti.</p>
          </div>
        </div>    {/* row1 */}
      </div>      {/* main1 */}

      {/* This is for the section pincture and the text inside */}
      <div className="section">
        <img src={section} alt="" width="100%" height="500px"></img>
        <div className="section-text">"There was an idea, called the COC Initiative. The idea was to bring together a group of remarkable people, see if they could become something more. See if they could work together when we needed them to, to guide the students we never could."</div>
      </div>    {/* section */}

      <div className="main2">

        {/* This is for dividing the coloumn into 3 parts and their text */}
        <div className="row1">
          <div className="column2" >
            <h2>Coding Workshop</h2>
            <p>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt   ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada  fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus   bibendum tincidunt. Suspendisse potenti.</p>
          </div>

          <div className="column2" >
            <h2>Mentorship Programs</h2>
            <p>Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt   ornare. Pellentesque habitant morbi tristique senectus et netus et malesuada  fames ac turpis egestas. Nullam in aliquet odio. Aliquam eu est vitae tellus   bibendum tincidunt. Suspendisse potenti.</p>
          </div>
        </div>    {/* row1 */}
      </div>      {/* main1 */}


  </div>
  );
}
