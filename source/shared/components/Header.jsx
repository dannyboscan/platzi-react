import React from 'react';
import { Link } from 'react-router';
import Style from './header.css';

const Header = (props) => {
  return (
    <header className={Style.header}>
      <h1 className={Style.title}>
        <span>React Con Redux</span>
        <img src="https://cdn.auth0.com/blog/react-js/react.png" alt="React" className={Style.react}/>
      </h1>

      <nav role="navigation" className={Style.navigation}>
        <Link to="/" className={Style.link}>
          <i className="fa fa-home"></i> Inicio
        </Link>

        <a href="https://www.hcmfront.com/" className={Style.link} target="_blank">
          HCMFront
        </a>
      </nav>
    </header>
  );
};

export default Header;
