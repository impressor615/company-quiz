import React, { Component, Fragment } from 'react';
import Router from 'next/router';

import { InputGroup, Alert } from 'Components/Inputs';
import Dropdown from 'Components/Dropdown';
import { Button } from 'Components/Buttons';
import { Form, Title, FlexContainer } from 'Components/StyleComponents';
import { DATABASE, STYLE } from 'Constants';


const ERRORS = ['tpay 직원이 맞으신가요? 정보를 확인해주세요!', '정보를 정확히 입력해주세요!'];
class App extends Component {
  state = {
    error: '',
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
    const { members } = DATABASE;

    members.forEach((member) => {
      if (
        member.department === department &&
        member.name === name &&
        member.position === position
      ) {
        Router.push({
          pathname: '/quiz',
          query: {
            name,
            department,
            position,
          },
        });
      }
    });

    this.setState({
      error: ERRORS[Math.floor(Math.random() * ERRORS.length)],
    });
  }

  render() {
    const { interviewee, error } = this.state;
    const { name, department, position } = interviewee;
    return (
      <Fragment>
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
          {
            error ?
              <Alert>{ error }</Alert> : null
          }
          <Button
            submit
            fluid
          >
            시작하기
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default App;
