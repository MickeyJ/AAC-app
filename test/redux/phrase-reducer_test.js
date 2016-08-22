import {expect} from '../test_helper'
import phraseReducer from '../../src/redux/phrase-reducer'
import {SELECT_CATEGORY} from '../../src/redux/constants'

describe("Phrase Reducer", () =>{

  it('handles action with unknown types', () =>{
    expect(phraseReducer(undefined, {})).to.be.instanceof(Object)
  });

  it('handles action of type ADD_COMMENT', () =>{
    const activeCategory = {title: 'Food', phrases: ['Gimme a burger', 'with fries', 'and soda']};
    const action = {type: SELECT_CATEGORY, payload: activeCategory};

    expect(phraseReducer([], action)).to.eql({activeCategory})
  })

});