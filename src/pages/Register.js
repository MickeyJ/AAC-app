import React, {PropTypes} from 'react'

import {Button, Input} from '../materials'

const Register = (props) => (
  <form
    className="form auth center-lat"
    onSubmit={props.handleSubmit.bind(this)}
    onChange={props.handleInputValidation.bind(this)}>

    <Input
      type="text"
      id="first-name"
      placeholder="First Name"
      className="shadow focusable"
      getSelf={props.getFirstName.bind(this)}
    />

    <Input
      type="text"
      id="last-name"
      placeholder="Last Name"
      className="shadow focusable"
      getSelf={props.getLastName.bind(this)}
    />

    <Input
      type="text"
      id="user-email"
      placeholder="Email"
      className="shadow focusable"
      getSelf={props.getUserEmail.bind(this)}
    />

    <Input
      type="password"
      id="user-password"
      placeholder="Password"
      className="shadow focusable"
      getSelf={props.getPassword.bind(this)}
    />

    <Button
      text="Signup"
      type="submit"
      className="bg-orange txt-white shadow clickable"
    />

  </form>
);

Register.propTypes = {
  handleSubmit: PropTypes.func,
  getUserName: PropTypes.func,
  getFirstName: PropTypes.func,
  getLastName: PropTypes.func,
  getUserEmail: PropTypes.func,
  getPassword: PropTypes.func
};

export default Register