import React, { Component } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import { InputGroup } from 'Components/Inputs';
import Dropdown from 'Components/Dropdown';
import { Button } from 'Components/Buttons';
import { DATABASE, STYLE } from 'Constants';


const { GET_REM } = STYLE;
const MainContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-size: ${GET_REM(16)};
  }
`;

const ContentContainer = styled.div`
  width: 25%;
`;

const Form = styled.form`
  width: 100%;

  button:last-child {
    padding: ${GET_REM(12)} 0;
    margin-top: ${GET_REM(20)};

    font-size: ${GET_REM(18)};
  }
`;

const Title = styled.div`
  font-size: ${GET_REM(30)};
  font-weight: bold;
  text-align: center;

  margin-bottom: ${GET_REM(40)};
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    flex-basis: 45%;

    button {
      width: 100%;
      padding: ${GET_REM(10)};
    }

    .dropdown-menu {
      right: 0px;
    }
  }
`;


class App extends Component {
  state = {
    interviewee: {
      name: '',
      department: DATABASE.departments[0],
      position: DATABASE.positions[0],
    },
  }

  componentDidMount() {
    this._updateFontSize();
    window.addEventListener('resize', this._updateFontSize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._updateFontSize);
  }

  _updateFontSize = () => {
    const width = window.innerWidth;
    if (width <= STYLE.SCREEN.MOBILE_BREAKPOINT) {
      $('html').css('font-size', `${width / 26.78}px`);
    } else {
      $('html').css('font-size', `${width / 137}px`);
    }
  }

  _onChange = (e) => {
    e.preventDefault();
    this.setState({
      interviewee: {
        ...this.state.interviewee,
        [e.target.name]: e.target.value,
      },
    });
  }

  _onSubmit = (e) => {
    e.preventDefault();
    const { interviewee } = this.state;
    const { name, department, position } = interviewee;

    Router.push({
      pathname: '/quiz',
      query: {
        name,
        department,
        position,
      },
    });
  }

  render() {
    const { interviewee } = this.state;
    const { name, department, position } = interviewee;
    return (
      <MainContainer>
        <ContentContainer>
          <Title>
            동료 퀴즈
          </Title>
          <Form onSubmit={this._onSubmit}>
            <InputGroup>
              <InputGroup.Label>이름</InputGroup.Label>
              <InputGroup.Input
                type="text"
                name="name"
                value={name}
                placeholder="이름을 입력하세요"
                onChange={this._onChange}
                required
              />
            </InputGroup>
            <FlexContainer>
              <InputGroup>
                <InputGroup.Label>부서</InputGroup.Label>
                <Dropdown
                  name="department"
                  color="btn-light"
                  items={DATABASE.departments}
                  value={department}
                  onChange={this._onChange}
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Label>직책</InputGroup.Label>
                <Dropdown
                  name="position"
                  color="btn-light"
                  items={DATABASE.positions}
                  value={position}
                  onChange={this._onChange}
                />
              </InputGroup>
            </FlexContainer>
            <Button
              submit
              fluid
            >
              시작하기
            </Button>
          </Form>
        </ContentContainer>
      </MainContainer>
    );
  }
}

export default App;
