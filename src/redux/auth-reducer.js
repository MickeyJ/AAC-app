import {
  REGISTER,
  LOGIN,
  VERIFY
} from './constants'

const INITIAL_STATE = { user: {}, token: '', category: [], error: null };

export default function(state = INITIAL_STATE, action) {
  const {payload, type} = action;

  switch(type){

    case REGISTER:
      if(payload.response) return { ...state,
        error: payload.response.data
      };
      else return { ...state,
        user: payload.data.user,
        token: payload.data.token,
        error: null
      };

    case LOGIN:
      if(payload.response) return { ...state,
        error: payload.response.data
      };
      else return { ...state,
        user: payload.data.user,
        category: payload.data.category,
        token: payload.data.token,
        error: null
      };

    case VERIFY:
      if(payload.response) return { ...state,
        error: payload.response.data
      };
      else return { ...state,
        user: payload.data.user,
        category: payload.data.category,
        token: payload.data.token,
        error: null
      };

    default:
      return state
  }
}