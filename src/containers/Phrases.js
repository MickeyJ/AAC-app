import React, { Component } from 'react'

import { connect } from 'react-redux'
import {selectCategory} from '../redux/actions'

import {CategoryNav} from '../components'

class Phrases extends Component {
  constructor(props) {
    super(props);
  }
  handleChangeCategory(category) {
    this.props.selectCategory(category);
  }
  render() {
    const categories = this.props.activeCategory.phrases ? this.props.activeCategory.phrases : [];
    return(
      <div>

        <h1>Personal Phrases</h1>
          <div className="row">

            <CategoryNav
              links={this.props.categories}
              activeCategory={this.props.activeCategory}
              className="col-4"
              handleChange={this.handleChangeCategory.bind(this)}
            />

            <ul className="col-2 phrase-list">
              {categories.map((x, i) =>(
                <li key={i}>{x.text}</li>
              ))}
            </ul>

          </div>

      </div>
    )
  }
}

const mapStateToProps = (state) =>({
  categories: state.auth.category,
  activeCategory: state.phrases.activeCategory
});

export default connect(mapStateToProps, {
  selectCategory
})(Phrases);
