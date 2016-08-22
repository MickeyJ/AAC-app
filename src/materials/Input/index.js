import React from 'react'

const input = (props) => (
  <div>
    <input
      type={props.type || 'text'}
      id={props.id}
      name={props.id}
      className={`${props.className}`}
      defaultValue={props.defaultValue || null}
      placeholder={props.placeholder || null}
      ref={(ref) => props.getSelf(ref)}
    />
  </div>
);

export default input