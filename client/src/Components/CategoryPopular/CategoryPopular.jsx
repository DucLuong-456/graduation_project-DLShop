import React, { useContext } from "react";
import "./CategoryPopular.css";
import Category from "./Category";
import { AppContext } from "../../Context/AppContext";
const CategoryPopular = () => {
  const { categories } = useContext(AppContext);
  return (
    <>
      <h2 className="title-cate">Danh mục phổ biến</h2>
      <div className="section-category">
        {categories.map((category, index) => {
          if (index < 8)
            return <Category key={category._id} category={category} />;
        })}
      </div>
    </>
  );
};
export default CategoryPopular;
