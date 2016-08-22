import axios from 'axios'
import JWT from '../helpers/jwt'
import API from '../helpers/api'

import {
  REGISTER,
  LOGIN,
  VERIFY,
  SELECT_CATEGORY
} from './constants'

export function userRegister(credentials){
  const request = axios.post(`${API}/api/user/register`, credentials);
  return{
    type: REGISTER,
    payload: request
  }
}

export function userLogin(credentials){
  const request = axios.post(`${API}/api/user/login`, credentials);
  return{
    type: LOGIN,
    payload: request
  }
}

export function userVerify(){
  const request = axios({
    url: `${API}/api/user/me`,
    method: 'GET',
    headers: {'Authorization': `Bearer ${JWT.fetch()}`}
  });
  return{
    type: VERIFY,
    payload: request
  }
}

export function selectCategory(category){
  return {
    type: SELECT_CATEGORY,
    payload: category
  }
}
