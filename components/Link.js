import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const CustomLink = ({
  prefetch,
  href,
  children,
  ...rest
}) => (
  <Link prefetch={prefetch} href={href}>
    <a {...rest}>{ children }</a>
  </Link>

);

CustomLink.defaultProps = {
  prefetch: false,
};

CustomLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  prefetch: PropTypes.bool,
};

export default CustomLink;