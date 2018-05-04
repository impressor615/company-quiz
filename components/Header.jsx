import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Link from 'Components/Link';

const Header = ({ isLoggedIn }) => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <Link prefetch href="/" className="navbar-brand">
      오늘, 카페
    </Link>
    {
      typeof isLoggedIn === 'boolean' && isLoggedIn ?
        <Fragment>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav w-100">
              <li className="nav-item mr-auto">
                <Link prefetch href="/stores" className="nav-link">
                  매장
                </Link>
              </li>
              <li className="nav-item">
                <Link prefetch href="/settings" className="nav-link">
                  설정
                </Link>
              </li>
              <li className="nav-item">
                <Link prefetch href="/login" className="nav-link">
                  로그인
                </Link>
              </li>
            </ul>
          </div>
        </Fragment> : null
    }
  </nav>
);

Header.defaultProps = {
  isLoggedIn: undefined,
};

Header.propTypes = {
  isLoggedIn: PropTypes.bool,
};

export default Header;
