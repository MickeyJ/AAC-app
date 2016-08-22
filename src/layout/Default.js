import React, { Component, PropTypes, cloneElement } from 'react'

import { connect } from 'react-redux'
import { userVerify } from '../redux/actions'

import JWT from '../helpers/jwt'
import {handleRouteChange} from '../helpers/route-change'

import NavBar from './NavBar'
import {VoiceList} from '../components'

class DefaultLayout extends Component {
  constructor(){
    super();
    this.state = {
      selectedVoice: 'Samantha',
      errorMessage: ''
    };
  }
  componentWillMount(){
    if(!JWT.fetch()){}
    else {
      this.props.userVerify().then(res => {
        let tokenError = (
          res.payload.response
            ? res.payload.response.data.message === 'jwt malformed'||'invalid token'
            : null
        );
        if(tokenError){
          this.handleLogout()
        }
      })
    }
  }
  componentDidMount(){
    handleRouteChange(this, this.setErrorMessage.bind(this), '')
  }
  handleLogout(e){
    if(e) e.preventDefault();
    JWT.destroy();
    window.location.replace('/');
  }
  setErrorMessage(error){
    this.setState({ errorMessage: error })
  }
  changeVoice(e){
    this.setState({ selectedVoice: e.target.value});
  }
  render(){
    return(
      <div id="default-wrapper">

        <section id="top-container" className="row">

          <header className="col-3 app-header border-dark">
            <span>AAC</span>
          </header>

          <NavBar
            className="col-3 app-navigation border-dark"
            handleLogout={this.handleLogout.bind(this)}
            token={JWT.fetch()}
          />

          <VoiceList
            className="col-3 border-dark"
            changeVoice={this.changeVoice.bind(this)}
            selectedVoice={this.state.selectedVoice}
          />

        </section>

        <main id="main-container">

          <h3>Welcome {this.props.user.first_name || ''}</h3>

          {cloneElement(this.props.children, {
            selectedVoice: this.state.selectedVoice,
            setErrorMessage: this.setErrorMessage.bind(this),
            errorMessage: this.state.errorMessage
          })}
        </main>

      </div>
    )
  }
}

DefaultLayout.contextTypes = {
  router: PropTypes.object
};

DefaultLayout.propTypes = {
  user: PropTypes.object.isRequired,
  userVerify: PropTypes.func.isRequired
};

const mapStateToProps = (state) =>({
  user: state.auth.user
});

export default connect(mapStateToProps, {
  userVerify,
})(DefaultLayout);
