import {renderComponent, expect} from '../test_helper'
import {Speaker} from '../../src/components'

describe('Speaker Component', () =>{
  let component;

  beforeEach(() =>{
    component = renderComponent(Speaker);
  });

  it('has the correct class', () =>{
    expect(component).to.have.class('speaker')
  });

  it('has a form', () =>{
    expect(component.find('form')).to.exist;
  });

  it('has one input', () =>{
    expect(component.find('input')).to.exist;
  });

  it('has one button', () =>{
    expect(component.find('button')).to.exist;
  });

});