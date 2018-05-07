import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styled from 'styled-components';

import { STYLE } from 'Constants';

const { GET_REM } = STYLE;
const StyledButton = styled.button`
  padding: ${GET_REM(12)} ${GET_REM(10)};
  margin-top: ${GET_REM(20)};

  font-size: ${GET_REM(18)};
`;

export const Button = ({
  children,
  loading,
  color,
  submit,
  onClick,
  fluid,
  loadingText,
  ...rest
}) => (
  <StyledButton
    type={submit ? 'submit' : ''}
    className={classnames(
      `btn ${color}`,
      { disabled: loading },
      { 'w-100': fluid },
    )}
    onClick={onClick}
    {...rest}
  >
    {
      loading ? loadingText : children
    }
  </StyledButton>
);

Button.defaultProps = {
  loading: false,
  color: 'btn-primary',
  submit: false,
  fluid: false,
  loadingText: 'LOADING...',
  onClick: () => {},
};

Button.propTypes = {
  submit: PropTypes.bool,
  fluid: PropTypes.bool,
  loading: PropTypes.bool,
  color: PropTypes.string,
  onClick: PropTypes.func,
  loadingText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const ModalButton = ({ children, id }) => (
  <Fragment>
    { children.map((child, idx) => (
        React.cloneElement(child, {
          // eslint-disable-next-line
          key: idx,
          id,
        })
      ))
    }
  </Fragment>
);

ModalButton.defaultProps = {
  id: 'Modal',
};

ModalButton.propTypes = {
  children: PropTypes.node.isRequired,
  id: PropTypes.string,
};


const ModalShowButton = ({ children, color, id }) => (
  <button type="button" className={`btn ${color}`} data-toggle="modal" data-target={`#${id}`}>
    { children }
  </button>
);

ModalShowButton.defaultProps = {
  color: 'btn-primary',
  id: 'Modal',
};

ModalShowButton.propTypes = {
  children: PropTypes.string.isRequired,
  color: PropTypes.string,
  id: PropTypes.string,
};

const ModalContent = ({
  title, children, id, action,
}) => (
  <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">{ title }</h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          { children }
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" data-dismiss="modal">취소</button>
          <button type="button" className="btn btn-primary" onClick={action.onClick}>{action.name}</button>
        </div>
      </div>
    </div>
  </div>
);


ModalContent.defaultProps = {
  id: 'Modal',
};

ModalContent.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string,
  action: PropTypes.object.isRequired,
};

ModalButton.Button = ModalShowButton;
ModalButton.Modal = ModalContent;
