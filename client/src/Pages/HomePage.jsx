import React, { useEffect, useState } from "react";
import Slider from "../Components/Slider/Slider";
import Advertise from "../Components/Advertise/Advertise";
import CategoryPopular from "../Components/CategoryPopular/CategoryPopular";
import Product from "../Components/Product/Product";
import Title from "../Components/Title/Title";
import axios from "axios";
import Paging from "../Components/Common/Paging/Paging";
import "./HomePage.css";
const HomePage = () => {
  const [products, setProducts] = useState({ data: [], paging: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const itemsPerPage = 8;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/product/?limit=${itemsPerPage}&page=${currentPage}`
        );
        setProducts(response.data);
        setTotalItems(response.data.paging.total_count);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [currentPage]);

  console.log(products);
  return (
    <>
      <Slider />
      <Advertise />
      <CategoryPopular />
      <Title />
      <div className="ListProduct">
        {products.data.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <Paging
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPageParent={currentPage}
      />
    </>
  );
};
export default HomePage;
