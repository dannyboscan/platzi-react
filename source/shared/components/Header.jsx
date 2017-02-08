import React from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

import Style from './header.css';

function Header() {
  return (
    <header className={Style.header}>
      <h1 className={Style.title}>
        <FormattedMessage id="title" />
        <img src="https://cdn.auth0.com/blog/react-js/react.png" alt="React" className={Style.react} />
      </h1>

      <nav role="navigation" className={Style.navigation}>
        <Link to="/" className={Style.link}>
          <i className="fa fa-home" /> <FormattedMessage id="header.nav.home" />
        </Link>

        <a href="https://www.hcmfront.com/" className={Style.link} rel="noopener noreferrer" target="_blank">
          HCMFront
        </a>
      </nav>
    </header>
  );
}

export default Header;
