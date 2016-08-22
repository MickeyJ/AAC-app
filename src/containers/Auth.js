import React, { Component, cloneElement, PropTypes } from 'react'

import { connect } from 'react-redux'
import { userRegister, userLogin } from '../redux/actions'

import {errorCount, Validate, regexEmail} from '../helpers/forms'
import {incompleteForm, invalidInput} from '../helpers/messages'
import JWT from '../helpers/jwt'

const validate = new Validate;

class Auth extends Component {
  constructor(props){
    super(props);
    this.errors = {};
  }
  componentDidMount(){
    this.setAuthType();
  }
  componentDidUpdate(){
    this.setAuthType()
  }
  setAuthType(){
    this.authType = this.props.children.props.location.pathname.split('/')[2]
  }
  getFirstName(ref){  this.first_name = ref }
  getLastName(ref){   this.last_name  = ref }
  getUserEmail(ref){  this.email      = ref }
  getPassword(ref){   this.password   = ref }

  formData(){
    return this.authType === 'register'
      ? {
        first_name: this.first_name.value,
        last_name: this.last_name.value,
        email: this.email.value,
        password: this.password.value
      }
      : {
        email: this.email.value,
        password: this.password.value
      }
  }
  handleInputValidation(e){
    const { target } = e;

    switch(target.id){
      case 'first-name':
        validate.length(target, target.value, 2, 1);
        break;
      case 'last-name':
        validate.length(target, target.value, 2, 2);
        break;
      case 'user-email':
        validate.regex(target, target.value, regexEmail, 3);
        break;
      case 'user-password':
        validate.length(target, target.value, 8, 4);
        break;
      default:
        return null;
    }

  }
  handleSubmit(e){
    e.preventDefault();

    const formData = this.formData();

    for (var field in formData) {
      if (formData.hasOwnProperty(field)) {
        if(!formData[field]) this.errors[field] = 'EMPTY';
        else delete this.errors[field];
      }
    }

    if(errorCount(this.errors)){

      return this.props.setErrorMessage(incompleteForm);

    } else if(errorCount(validate.errors)){

      return this.props.setErrorMessage(invalidInput);

    } else {
      if(this.authType === 'register'){
        this.props.userRegister(formData).then(res =>{
          if(res.error)
            this.props.setErrorMessage(res.payload.response.data);
          else{
            JWT.save(res.payload.data.token);
            this.context.router.replace('/dashboard');
          }
        })
      }
      if(this.authType === 'login'){
        this.props.userLogin(formData).then(res =>{
          if(res.error)
            this.props.setErrorMessage(res.payload.response.data);
          else{
            JWT.save(res.payload.data.token);
            this.context.router.replace('/dashboard');
          }
        })
      }
    }
  }
  render(){
    return(
      <div className="row">

        <span>{this.props.errorMessage}</span>

        <div className="col-1 auth-container">
          {cloneElement(this.props.children, {
            handleSubmit: this.handleSubmit.bind(this),
            handleInputValidation: this.handleInputValidation.bind(this),
            getFirstName: this.getFirstName.bind(this),
            getLastName: this.getLastName.bind(this),
            getUserEmail: this.getUserEmail.bind(this),
            getPassword: this.getPassword.bind(this),
          })}
        </div>

      </div>
    )
  }
}

Auth.contextTypes = {
  router: PropTypes.object
};

Auth.propTypes = {
  setErrorMessage: PropTypes.func.isRequired,
  errorMessage: PropTypes.string.isRequired
};

const mapStateToProps = (state) =>({
  error: state.auth.error
});

export default connect(mapStateToProps, {
  userRegister,
  userLogin
})(Auth);

