import { combineReducers } from 'redux'

import AuthReducer from './auth-reducer'
import PhraseReducer from './phrase-reducer'

export default combineReducers({
  auth: AuthReducer,
  phrases: PhraseReducer,
});