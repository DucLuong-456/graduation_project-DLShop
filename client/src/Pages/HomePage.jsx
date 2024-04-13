import React from "react";
import Slider from "../Components/Slider/Slider";
import Advertise from "../Components/Advertise/Advertise";
import CategoryPopular from "../Components/CategoryPopular/CategoryPopular";
import Product from "../Components/Product/Product";
import Title from "../Components/Title/Title";
import { useState } from "react";
const HomePage = () => {
  const [ListProduct] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
  return (
    <>
      <Slider />
      <Advertise />
      <CategoryPopular />
      <Title />
      <div className="ListProduct">
        {ListProduct.map((item, i) => (
          <Product key={i} />
        ))}
      </div>
    </>
  );
};
export default HomePage;
