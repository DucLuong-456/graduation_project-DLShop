import React, { useEffect, useState } from "react";
import "./CategoryPopular.css";
import axios from "axios";
import danhmuc_1 from "../Assets/Image/danhmuc_1.jpg";
import Category from "./Category";
const CategoryPopular = () => {
  const [categories, setCategories] = useState([]);
  console.log(process.env.REACT_APP_API_KEY);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/category/`
        );
        setCategories(response.data.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  return (
    <>
      <h2 className="title-cate">Danh mục phổ biến</h2>
      <div className="section-category">
        {categories.map((category) => {
          return <Category key={category._id} category={category} />;
        })}
      </div>
    </>
  );
};
export default CategoryPopular;
