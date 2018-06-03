import React, { Component } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import { InputGroup, Alert } from 'Components/Inputs';
import { Button } from 'Components/Buttons';
import { Form, Title, FlexContainer } from 'Components/StyleComponents';
import { DATABASE, STYLE } from 'Constants';


const ContentContainer = styled.div`
  width: 100%;

  @media only screen and (min-width: 767px) {
    width: 50%;
    margin: auto;
  }
`;
const NormalText = styled.span`
  font-weight: 100;
`;

const StyledDropdownMenu = styled(DropdownMenu)`
  overflow: auto;
  height: 90vh;

  @media only screen and (min-width: 767px) {
    height: auto;
  }
`;
const ERRORS = ['tpay 직원이 맞으신가요? 정보를 확인해주세요!', '정보를 정확히 입력해주세요!'];
class App extends Component {
  state = {
    departmentIsToggled: false,
    positionIsToggled: false,
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

  _toggleDepartment = () => {
    this.setState(prevState => ({
      departmentIsToggled: !prevState.departmentIsToggled,
    }));
  }

  _togglePosition = () => {
    this.setState(prevState => ({
      positionIsToggled: !prevState.positionIsToggled,
    }));
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

    let isValid = false;
    members.forEach((member) => {
      if (
        member.department === department &&
        member.name === name &&
        member.position === position
      ) {
        isValid = true;
      }
    });


    if (isValid) {
      Router.push({
        pathname: '/quiz',
        query: {
          name,
          department,
          position,
        },
      });
    } else {
      this.setState({
        error: ERRORS[Math.floor(Math.random() * ERRORS.length)],
      });
    }
  }

  render() {
    const {
      interviewee, error, departmentIsToggled, positionIsToggled,
    } = this.state;
    const { name, department, position } = interviewee;
    return (
      <ContentContainer>
        <Title>
          <NormalText>너,&nbsp;</NormalText>나의 동료<NormalText>가 되라!</NormalText>
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
              <Dropdown isOpen={departmentIsToggled} toggle={this._toggleDepartment}>
                <DropdownToggle caret>
                  { department }
                </DropdownToggle>
                <StyledDropdownMenu>
                  {
                    DATABASE.departments.map((item, idx) => (
                      <DropdownItem
                        // eslint-disable-next-line
                        key={idx}
                        onClick={this._onChange}
                        value={item}
                        name="department"
                        active={department === item}
                      >
                        {item}
                      </DropdownItem>
                    ))
                  }
                </StyledDropdownMenu>
              </Dropdown>
            </InputGroup>
            <InputGroup>
              <InputGroup.Label>직책</InputGroup.Label>
              <Dropdown isOpen={positionIsToggled} toggle={this._togglePosition}>
                <DropdownToggle caret>
                  { position }
                </DropdownToggle>
                <DropdownMenu>
                  {
                    DATABASE.positions.map((item, idx) => (
                      <DropdownItem
                        // eslint-disable-next-line
                        key={idx}
                        onClick={this._onChange}
                        value={item}
                        name="position"
                        active={position === item}
                      >
                        {item}
                      </DropdownItem>
                    ))
                  }
                </DropdownMenu>
              </Dropdown>
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
      </ContentContainer>
    );
  }
}

export default App;
