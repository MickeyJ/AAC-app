import {renderComponent, expect} from '../test_helper'
import {CategoryNav} from '../../src/components'

describe('Category Nav Component', () =>{
  let component;
  const activeCategory = { category_id: 1 };
  const links = [
    {title: 'Food', category_id: 1},
    {title: 'Friends', category_id: 2}
  ];
  const props = {activeCategory, links};

  beforeEach(() =>{
    component = renderComponent(CategoryNav, props);
  });

  it('has the correct component style classname', () =>{
    expect(component).to.have.class('category-nav')
  });

  it('has style classname for active category tab', () =>{
    console.log(component);
    expect(component.find('p').first()).to.have.class('active-category');
  });


});