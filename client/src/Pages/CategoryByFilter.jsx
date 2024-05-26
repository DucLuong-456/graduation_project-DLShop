import React, { useEffect, useState, useContext } from "react";
import Slider from "../Components/Slider/Slider";
import Advertise from "../Components/Advertise/Advertise";
import CategoryPopular from "../Components/CategoryPopular/CategoryPopular";
import Product from "../Components/Product/Product";
import Title from "../Components/Title/Title";
import axios from "axios";
import Paging from "../Components/Common/Paging/Paging";
import "./HomePage.css";
import { AppContext } from "../Context/AppContext";

const CategoryByFilter = () => {
  const { categories } = useContext(AppContext);
  const [products, setProducts] = useState({ data: [], paging: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [price, setPrice] = useState(100000000);
  const [categoryId, setCategoryId] = useState("");
  const [sort, setSort] = useState("");

  const itemsPerPage = 8;
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleFilterByCategory = (event) => {
    const { value } = event.target;
    setCategoryId(value);
  };
  const handlePriceChange = (event) => {
    const { value } = event.target;
    setPrice(value);
  };
  const handleSortChange = (event) => {
    const { value } = event.target;
    setSort(value);
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/product/?limit=${itemsPerPage}&page=${currentPage}&price=${price}&categoryId=${categoryId}&sort=${sort}`
        );
        setProducts(response.data);
        setTotalItems(response.data.paging.total_count);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [currentPage, categoryId, price, sort]);

  return (
    <>
      <h2 className="title-cate">SẢN PHẨM THEO DANH MỤC</h2>
      <div className="title-category-filter">
        <div className="cate-1">
          <h1>Danh mục: </h1>
          <select id="cars" name="cars" onChange={handleFilterByCategory}>
            <option value="">-- Danh mục --</option>
            {categories &&
              categories.map((item, index) => {
                return <option value={item._id}>{item.name}</option>;
              })}
          </select>
        </div>

        <div className="cate-2">
          <div className="cate-2-2">
            <h1>Giá từ: </h1>
            <select id="cars" name="cars" onChange={handlePriceChange}>
              <option value="">-- lựa chọn --</option>

              <option value={1000000}>1.000.000 đ</option>
              <option value={5000000}>5.000.000 đ</option>

              <option value={10000000}>15.000.000 đ</option>
              <option value={20000000}>25.000.000 đ</option>
              <option value={30000000}>30.000.000 đ</option>
            </select>
          </div>

          <div className="cate-2-2">
            <h1>Sắp xếp theo giá: </h1>
            <select id="cars" name="cars" onChange={handleSortChange}>
              <option value="">-- lựa chọn --</option>
              <option value="price_asc">Tăng dần</option>
              <option value="price_desc">Giảm dần</option>
            </select>
          </div>
        </div>
      </div>
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
export default CategoryByFilter;
