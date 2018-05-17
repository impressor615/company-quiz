import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import classnames from 'classnames';

import { STYLE } from 'Constants';

const { GET_REM } = STYLE;
const ErrorDiv = styled.div`
  margin-top: ${GET_REM(10)};
`;

export const Label = ({ children, ...rest }) => (
  <label {...rest}>{children}</label>
);

Label.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
};

export const Alert = ({ children, color, ...rest }) => (
  <ErrorDiv className={`alert ${color}`} role="alert" {...rest}>
    {children}
  </ErrorDiv>
);

Alert.defaultProps = {
  color: 'alert-danger',
};

Alert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  color: PropTypes.string,
};

export const Input = ({
  type,
  name,
  value,
  placeholder,
  onChange,
  required,
  ...rest
}) => (
  <input
    type={type}
    name={name}
    value={value}
    className="form-control"
    placeholder={placeholder}
    onChange={onChange}
    required={required}
    {...rest}
  />
);

Input.defaultProps = {
  placeholder: '',
  required: false,
};
Input.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
};

const RadioLabel = styled.label`
  cursor: pointer;

  font-size: ${GET_REM(18)};
  font-weight: 300;

  display: flex;
  align-items: center;
  &:before {
    display: inline-block;
    content: "";
    width: ${props => (props.labelWidth ? props.labelWidth : GET_REM(25))};
    height: ${props => (props.labelHeight ? props.labelHeight : GET_REM(25))};
    background: ${props => (props.backgroundColor ? props.backgroundColor : 'white')};
    margin-right: ${GET_REM(15)};
    border: 1px solid rgba(34,36,38,.35);
  }
`;

const RadioButton = styled.button`
  background: transparent;
  border: none;
  outline: none;

  &:focus {
    outline: none;
  }

  &.active {
    ${RadioLabel} {
      &:before {
        background: #cce5ff;
      }
    }
  }
`;

export const Radio = ({
  name,
  value,
  onClick,
  children,
  current,
  ...rest
}) => (
  <RadioButton
    className={classnames({ active: current === value })}
    name={name}
    value={value}
    onClick={onClick}
    {...rest}
  >
    <RadioLabel>
      { children }
    </RadioLabel>
  </RadioButton>
);

Radio.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  current: PropTypes.string.isRequired,
};

export const InputGroup = ({ children, ...rest }) => (
  <div className="form-group" {...rest}>
    {children}
  </div>
);

InputGroup.propTypes = {
  children: PropTypes.node.isRequired,
};

InputGroup.Label = Label;
InputGroup.Error = Alert;
InputGroup.Input = Input;
InputGroup.Radio = Radio;
