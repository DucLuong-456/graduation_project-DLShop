import React, { Fragment, useEffect, useState } from "react";
import "./Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
import logo4 from "../../Assets/Image/logo4.png";
const SearchSuggestions = ({ products, setNameSearch }) => {
  return (
    <div className="search-suggest">
      {products.data.map((product) => (
        <div key={product._id} className="product-item-search">
          <img
            src={process.env.REACT_APP_API_LINK_STATIC + product.image}
            alt={product.name}
          />
          <div>
            <Link
              to={"/detail_product/" + product._id}
              onClick={() => {
                setNameSearch("");
              }}
            >
              <p className="suggest-product-name">{product.name}</p>
            </Link>
            <p className="suggest-product-price">
              {parseInt(product.price).toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Header = () => {
  const [nameSearch, setNameSearch] = useState("");
  const [searchResults, setSearchResults] = useState({ data: [], paging: {} });

  useEffect(() => {
    if (nameSearch !== "") {
      const getProducts = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_KEY}/api/product?limit=5&name=${nameSearch}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    }
  }, [nameSearch]);

  const handleSearchByName = (event) => {
    const { value } = event.target;
    setNameSearch(value);
  };

  return (
    <>
      <div className="top-header">
        <div className="header-container">
          <div className="row">
            <Link to="/">
              <div className="header-logo">
                <img src={logo4} alt="logo" />
                {/* DLShop */}
              </div>
            </Link>
            <div className="header-search-box">
              <form action="" className="form-input-search">
                <input
                  type="text"
                  placeholder="Nhập tên sản phẩm..."
                  value={nameSearch}
                  onChange={handleSearchByName}
                />
                <div className="div-icon-search">
                  <AiOutlineSearch className="icon-search" />
                </div>
                {nameSearch === "" ? (
                  Fragment
                ) : (
                  <SearchSuggestions
                    products={searchResults}
                    setNameSearch={setNameSearch}
                  />
                )}
              </form>
            </div>
            <div className="header-contact">
              <div>Hỗ trợ 24h</div>
              <div>1900 6750</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
