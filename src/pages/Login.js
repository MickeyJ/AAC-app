import React, {PropTypes} from 'react'

import {Button, Input} from '../materials'

const Login = (props) => (
  <form
    className="form auth center-lat"
    onSubmit={props.handleSubmit.bind(this)}
    onChange={props.handleInputValidation.bind(this)}>

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
      text="Login"
      type="submit"
      className="bg-orange txt-white shadow clickable"
    />
  </form>
);

Login.propTypes = {
  handleSubmit: PropTypes.func,
  getUserEmail: PropTypes.func,
  getPassword: PropTypes.func
};

export default Login