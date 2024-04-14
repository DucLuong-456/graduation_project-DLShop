import React from "react";
import "./CategoryPopular.css";
const Category = ({ category }) => {
  return (
    <>
      <div className="item-cate">
        <div className="bg-img-cate">
          <img
            src={process.env.REACT_APP_API_LINK_STATIC + category.icon_category}
            alt={category.icon_category}
          />
        </div>
        <h3 className="name-item-cate">{category.name}</h3>
      </div>
    </>
  );
};
export default Category;
