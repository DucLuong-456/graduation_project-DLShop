import React, { useContext } from "react";
import Slider from "../Components/Slider/Slider";
import Advertise from "../Components/Advertise/Advertise";
import CategoryPopular from "../Components/CategoryPopular/CategoryPopular";
import Product from "../Components/Product/Product";
import Title from "../Components/Title/Title";
import { AppContext } from "../Context/AppContext";
const HomePage = () => {
  const { products, token } = useContext(AppContext);
  console.log(token);
  return (
    <>
      <Slider />
      <Advertise />
      <CategoryPopular />
      <Title />
      <div className="ListProduct">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};
export default HomePage;
