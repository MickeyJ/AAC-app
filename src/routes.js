import React from 'react'
import {Router, Route, IndexRoute, hashHistory} from 'react-router'

import DefaultLayout from './layout/Default'
import Landing from './pages/Landing'
import Auth from './containers/Auth'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Phrases from './containers/Phrases'

const Routes = () =>(
  <Router history={hashHistory}>
    <Route path="/" component={DefaultLayout}>
      <IndexRoute component={Landing}/>
      <Route path="auth" component={Auth}>
        <Route path="register" component={Register}/>
        <Route path="login" component={Login}/>
      </Route>
      <Route path="dashboard" component={Dashboard}/>
      <Route path="phrases" component={Phrases}/>
    </Route>
  </Router>
);

export default Routes