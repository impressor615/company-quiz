import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const Dropdown = ({
  name, value, items, placeholder, onChange, color,
}) => (
  <div className="dropdown">
    <button
      type="button"
      className={`btn ${color} dropdown-toggle`}
      id="dropdownMenuButton"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      { !value ? placeholder : value }
    </button>
    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
      {
        items.map(item => (
          <button
            name={name}
            key={item}
            className={
              classnames('dropdown-item',
              { active: item === value })
            }
            onClick={onChange}
            value={item}
          >
            {item}
          </button>
        ))
      }
    </div>
  </div>
);

Dropdown.defaultProps = {
  placeholder: '클릭하여 선택',
  color: 'btn-primary',
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  color: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
