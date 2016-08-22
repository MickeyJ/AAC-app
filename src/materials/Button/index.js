import React, {PropTypes} from 'react'
import {Link} from 'react-router'

const button = (props) => (
  props.to
    ? (
    <Link
      to={props.to}
      className={`app-btn hoverable ${props.className}`}>
      <span>{props.text}</span>
    </Link>
    )
    : (
    <button
      type={props.type || 'button'}
      className={`app-btn hoverable ${props.className}`}
      onClick={props.handleClick ? props.handleClick.bind(this) : null}>
      <span>{props.text}</span>
    </button>
    )
);

button.propTypes = {
  to: PropTypes.string,
  text: PropTypes.string.isRequired,
  handleClick: PropTypes.func,
  className: PropTypes.string,
};

export default button