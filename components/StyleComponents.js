import { STYLE } from 'Constants';
import styled from 'styled-components';

const { GET_REM } = STYLE;
const largestMobileScreen = '767px';
export const MainContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    font-size: ${GET_REM(16)};
  }
`;

export const ContentContainer = styled.div`
  width: 80%;

  @media only screen and (min-width: ${largestMobileScreen}) {
    width: 25%;
  }
`;

export const Form = styled.form`
  width: 100%;

  input {
    padding: ${GET_REM(12)} ${GET_REM(10)};
  }
`;

export const Title = styled.div`
  font-size: ${GET_REM(28)};
  font-weight: bold;
  text-align: center;

  margin-bottom: ${GET_REM(40)};

  @media only screen and (min-width: ${largestMobileScreen}) {
    font-size: ${GET_REM(30)};
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    flex-basis: ${props => (props.itemWidth ? props.itemWidth : '45%')};

    button {
      width: 100%;
      padding: ${GET_REM(10)};
    }

    .dropdown-menu {
      right: 0px;
    }
  }
`;

export const Center = styled.div`
  text-align: center;
  margin-bottom: ${GET_REM(30)};

  .form-group {
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      width: auto;
      margin-right: ${GET_REM(25)};
    }
  }
`;

export const QuizImg = styled.img`
  width: 50%;
  margin-bottom: ${GET_REM(30)};

  @media only screen and (min-width: ${largestMobileScreen}) {
    width: ${GET_REM(300)};
  }
`;
