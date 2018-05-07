import React from 'react';
import App, { Container } from 'next/app';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';

import Layout from 'Components/Layout';

const StyleTransitionGroup = styled(TransitionGroup)`
  position: relative;
  overflow: hidden;
  height: 100%;
`;

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <StyleTransitionGroup>
          <CSSTransition
            key={this.props.router.route}
            classNames="fade"
            timeout={800}
          >
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </CSSTransition>
        </StyleTransitionGroup>
        <style jsx global>
          {`
            .fade-enter {
              left: -100vw;
              opacity: 0;
            }
            .fade-enter-active {
              left: 0;
              opacity: 1;
              transition: all 1s cubic-bezier(.39,.575,.565,1);
            }
            .fade-exit {
              right: 0;
              opacity: 1;
            }
            .fade-exit-active {
              right: -100vw;
              opacity: 0;
              transition: all 1s cubic-bezier(.39,.575,.565,1);
            }
          `}
        </style>
      </Container>
    );
  }
}

export default MyApp;
