/* eslint-disable */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import { Title } from 'Components/StyleComponents';
import { Button } from 'Components/Buttons';
import { Table } from 'reactstrap';
import styled from 'styled-components';
import { STYLE } from 'Constants';


const { GET_REM } = STYLE;
const StyledTable = styled(Table)`
  line-height: 3;
  font-size: ${GET_REM(24)};

  margin: ${GET_REM(50)} 0;
`;
const BoldTd = styled.td`
  font-weight: bold;
`;
const RankTables = ({ data }) => (
  <StyledTable>
    <thead>
      <tr>
        <th>순위</th>
        <th>이름</th>
        <th>문제 개수</th>
        <th>정답 개수</th>
        <th>정답률</th>
      </tr>
    </thead>
    <tbody>
      {
        data.map((item, idx) => (
          <tr key={idx}>
            <th scope="row">{ `${parseInt(idx, 10) + 1}위` }</th>
            <td>{`${item.name}(${item.department})`}</td>
            <td>{item.result.question_count}</td>
            <td>{item.result.correct_count}</td>
            <BoldTd>
              { `${item.result.correct_percent}%` }
            </BoldTd>
          </tr>
        ))
      }
    </tbody>
  </StyledTable>
);

RankTables.propTypes = {
  data: PropTypes.array.isRequired,
};

const NormalFont = styled.span`
  font-weight: 100;
`;
const goBack = () => Router.push('/');
class Result extends Component {
  static async getInitialProps({ req }) {
    const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
    const result = await fetch(`${baseUrl}/api/results`)
      .then(res => res.json());
    return {
      result,
    };
  }

  render() {
    const { result } = this.props;
    return (
      <Fragment>
        <Title>
          <NormalFont>
            고생하셨습니다.<br />
            서로에 대한 관심이<br />
          </NormalFont>
          tpay
          <NormalFont>
            를 행복하게 만듭니다.
          </NormalFont>
        </Title>
        <RankTables data={result} />
        <Button
          fluid
          onClick={goBack}
        >
          다시 하기
        </Button>
      </Fragment>
    );
  }
}

export default Result;
