import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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

export const Alert = ({ children, ...rest }) => (
  <ErrorDiv className="alert alert-danger" role="alert" {...rest}>
    {children}
  </ErrorDiv>
);

Alert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
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
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
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
