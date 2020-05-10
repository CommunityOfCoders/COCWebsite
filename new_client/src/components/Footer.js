import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <div className="footer">
      <p>Get connected with us on social networks!</p>
      <div className="footer-center">
        <p>&copy; 2020-COC</p>
      </div>
      <div className="footer-right">
        <a href="https://www.facebook.com/CommunityOfCoders/?ref=br_rs" target="_blank" rel="noopener noreferrer"><i className="fa fa-fw fa-facebook-official"></i></a>
        <a href="https://www.youtube.com/channel/UCiiLKnn8iU9Q31cByvtT_5w" target="_blank" rel="noopener noreferrer"><i className="fa fa-fw fa-youtube-play" ></i> </a>
        <a href="https://www.instagram.com/coc_vjti/" target="_blank" rel="noopener noreferrer"><i class="fa fa-instagram" ></i></a>
      </div>
    </div>
  );
}
