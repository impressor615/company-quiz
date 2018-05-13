import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MainContainer, ContentContainer } from 'Components/StyleComponents';
import { STYLE } from 'Constants';


class Layout extends Component {
  componentDidMount() {
    this._updateFontSize();
    window.addEventListener('resize', this._updateFontSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateFontSize);
  }

  _updateFontSize = () => {
    const width = window.innerWidth;
    if (width <= STYLE.SCREEN.MOBILE_BERAKPOINT) {
      $('html').css('font-size', `${width / 26.78}px`);
    } else {
      $('html').css('font-size', `${width / 137}px`);
    }
  }

  render() {
    return (
      <MainContainer>
        <ContentContainer>
          { this.props.children }
        </ContentContainer>
      </MainContainer>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
