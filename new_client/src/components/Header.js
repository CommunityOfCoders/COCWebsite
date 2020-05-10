import React from 'react';
import { Link } from 'react-router-dom';


import './Header.css';
export default function Header() {
  return (
    <div className="navbar">
      <div className="navbar-right">
        <Link to="/"><i className="fa fa-fw fa-info"></i> HOME</Link>
        <Link to="/about"><i className="fa fa-fw fa-info"></i> ABOUT US</Link>

        <Link to="/"><i className="fa fa-fw fa-info"></i>EVENTS</Link>
        <Link to="/glimps"><i className="fa fa-fw fa-info"></i>GLIMPSES</Link>
        <Link to="/blogs"><i className="fa fa-fw fa-info"></i>BLOGS</Link>
        <Link to="/auth"><i className="fa fa-fw fa-info"></i> SIGN UP</Link>

      </div>
    </div>
  );
}
