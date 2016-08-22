import {
  SELECT_CATEGORY,
} from './constants'

const INITIAL_STATE = { activeCategory: {} };

export default function(state = INITIAL_STATE, action) {
  const {payload, type} = action;

  switch(type){

    case SELECT_CATEGORY:
      return { ...state,
        activeCategory: payload,
      };

    default:
      return state
  }
}