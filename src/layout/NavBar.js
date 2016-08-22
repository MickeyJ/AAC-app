import React from 'react'
import {Link} from 'react-router'

const NavBar = (props) => (
  !props.token
    ? (
      <nav className={props.className}>
        <Link to="/">Home</Link>
        <span> | </span>
        <Link to="/auth/register">Register</Link>
        <span> | </span>
        <Link to="/auth/login">Login</Link>
      </nav>
    )
    : (
      <nav className={props.className}>
        <Link to="/dashboard">Dashboard</Link>
        <span> | </span>
        <Link to="/phrases">Phrases</Link>
        <span> | </span>
        <Link to="#" onClick={props.handleLogout.bind(this)}>Logout</Link>
      </nav>
    )
);

export default NavBar