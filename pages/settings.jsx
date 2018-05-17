import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import fetch from 'isomorphic-fetch';

import { Form, Title } from 'Components/StyleComponents';
import { Button } from 'Components/Buttons';
import { InputGroup, Alert } from 'Components/Inputs';
import { STYLE, DATABASE } from 'Constants';


const { members } = DATABASE;
const { GET_REM } = STYLE;
const SettingText = styled.p`
  font-size: ${GET_REM(20)};
  padding-bottom: ${GET_REM(20)};

  > span {
    font-weight: bold;
  }
`;
const NormalText = styled.span`
  font-weight: 100;
`;
class Settings extends Component {
  state = {
    count: 0,
    current_count: 0,
    current_options_count: 0,
    options_count: 0,
    isCompleted: false,
    isError: false,
  }

  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const { question_counts, options_count } = await fetch(`${baseUrl}/api/settings`)
      .then(res => res.json());
    return {
      question_counts,
      options_count,
    };
  }

  // instead of componentwillreceiveprops
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      prevState.current !== nextProps.question_counts ||
      prevState.options_count !== nextProps.options_count
    ) {
      return {
        current_count: nextProps.question_counts,
        current_options_count: nextProps.options_count,
      };
    }
    return null;
  }

  componentWillUnmount() {
    if (this.reset) {
      clearTimeout(this.reset);
    }
  }

  _onChange = e => (
    this.setState({
      [e.target.name]: e.target.value,
    })
  )

  _onSubmit = (e) => {
    e.preventDefault();
    const { count, options_count } = this.state;

    if (
      !count || count <= 0 ||
      !options_count || options_count <= 0 ||
      count * options_count > members.length - 1
    ) {
      this.setState({
        isError: true,
      });
      return;
    }
    return fetch('/api/settings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        count,
        options_count,
      }),
    }).then(res => res.json())
      .then((result) => {
        if (!result.err) {
          this.setState({
            count: 0,
            options_count: 0,
            current_count: count,
            current_options_count: options_count,
            isCompleted: true,
            isError: false,
          });

          this.reset = setTimeout(() => {
            this.setState({
              isCompleted: false,
            });
          }, 5000);
        }
      });
  }

  render() {
    const {
      current_count, count, isCompleted,
      options_count, current_options_count,
      isError,
    } = this.state;
    return (
      <Fragment>
        <Title>
          퀴즈<NormalText>세팅</NormalText>
        </Title>
        <SettingText>현재 문제 개수: <span>{ current_count }개</span></SettingText>
        <SettingText>현재 문항 개수: <span>{ current_options_count }개</span></SettingText>
        <Form onSubmit={this._onSubmit}>
          <InputGroup>
            <InputGroup.Label>문제 개수</InputGroup.Label>
            <InputGroup.Input
              type="number"
              name="count"
              value={count}
              placeholder="문제 개수를 입력해주세요"
              onChange={this._onChange}
              required
            />
          </InputGroup>
          <InputGroup>
            <InputGroup.Label>문항 개수</InputGroup.Label>
            <InputGroup.Input
              type="number"
              name="options_count"
              value={options_count}
              placeholder="문항 개수를 입력해주세요"
              onChange={this._onChange}
              required
            />
          </InputGroup>
          {
            isCompleted ?
              <Alert color="alert-success">변경이 완료 되었습니다.</Alert> : null
          }
          {
            isError ?
              <Alert>유효하지 않은 설정값입니다.</Alert> : null
          }
          <Button
            submit
            fluid
          >
            저장하기
          </Button>
        </Form>
      </Fragment>
    );
  }
}

export default Settings;
