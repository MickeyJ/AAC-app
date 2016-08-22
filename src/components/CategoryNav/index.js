import React from 'react'

const categoryNav = props => {
  const activeCategory = props.activeCategory.category_id;
  const activeClass = "category-nav-link active-category";
  const inactiveClass = 'category-nav-link';

  return (
    <section className="category-nav">
      {props.links.map((x, i) =>(
        <p
          key={i}
          onClick={() => props.handleChange(x)}
          className={activeCategory == x.category_id ?  activeClass : inactiveClass} >

          <span className="link-title">{x.title}</span>
          <span className="link-arrow">&#10148;</span>
        </p>
      ))}
    </section>
  )
};

export default categoryNav
