import React from 'react';
import './Header.css';
export default function Header() {
  return (
    <div className="navbar">
        <div className="navbar-right">
          <ul>
            <a className="active" href="\#"><i className="fa fa-fw fa-home"></i> HOME</a> 
            <a href="/#"><i className="fa fa-fw fa-info"></i> ABOUT US</a>
            <a href="/#"><i className="fa fa-fw fa-terminal"></i> ACTIVITIES</a> 
            <a href="/#"><i className="fa fa-fw fa-picture-o"></i> GLIMPSES</a> 
            <a href="/#"><i className="fa fa-fw fa-users"></i> TEAM</a>
            <a href="/#"><i className="fa fa-fw fa-sign-in"></i> SIGN UP</a>
          </ul>
        </div>
    </div>
  );
}
