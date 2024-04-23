import React, { Fragment, useEffect, useState } from "react";
import "./Header.css";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import axios from "axios";
const SearchSuggestions = ({ products }) => {
  return (
    <div className="search-suggest">
      {products.data.map((product) => (
        <div key={product.id} className="product-item-search">
          <img
            src={process.env.REACT_APP_API_LINK_STATIC + product.image}
            alt={product.name}
          />
          <div>
            <p className="suggest-product-name">{product.name}</p>
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
                <img
                  src="https://bizweb.dktcdn.net/100/497/960/themes/923878/assets/logo.png?1710409416702"
                  alt="logo"
                />
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
                  <SearchSuggestions products={searchResults} />
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
