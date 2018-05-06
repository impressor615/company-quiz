import React, { Fragment } from 'react';
import Router from 'next/router';

import { Title } from 'Components/StyleComponents';
import { Button } from 'Components/Buttons';
import styled from 'styled-components';

const NormalFont = styled.span`
  font-weight: 100;
`;
const goBack = () => Router.push('/');
const Result = () => (
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
    <Button
      fluid
      onClick={goBack}
    >
      다시 하기
    </Button>
  </Fragment>
);

export default Result;
