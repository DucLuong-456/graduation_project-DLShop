import React, { useContext, useEffect, useState } from "react";
import "./ProductAdmin.css";
import ProductItem from "./ProductItem";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import { MoonLoader } from "react-spinners";

const ProductAdmin = () => {
  const { products, categories, setProducts, token, setCallBack, isLogged } =
    useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [productsAdmin, setProductAdmin] = useState([products.data]);
  const [keySearch, setKeySearch] = useState("");
  const [filter, setFilter] = useState("");
  const handleSearchByName = (event) => {
    const { value } = event.target;
    setKeySearch(value);
  };

  const handleLoading = (value) => {
    setLoading(value);
  };
  const handleFilterByCategory = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const override = {
    display: "block",
    position: "fixed",
    top: "40%",
    left: "50%",
    borderColor: "red",
    zIndex: 1000,
    // backgroundColor: "red",
  };
  useEffect(() => {
    let filterProduct = products.data.filter((item) => {
      return item.name.toLowerCase().includes(keySearch);
    });

    if (filter !== "") {
      filterProduct = products.data.filter((item) => {
        return item.category_id.includes(filter);
      });
    }

    setLoading(false);
    setProductAdmin(filterProduct);
  }, [keySearch, filter, products]);

  return (
    <>
      <div className="product-admin">
        <div className="product-admin-title">
          <div className="name-product-title">SẢN PHẨM</div>
          <Link to="/admin/create_product">
            {" "}
            <div className="create-new-product">Tạo mới</div>
          </Link>
        </div>
        <div className="product-content">
          <div className="product-input-filter">
            <input
              type="text"
              placeholder="search..."
              onChange={handleSearchByName}
            />
            <div>
              <select name="cars" id="cars" onChange={handleFilterByCategory}>
                <option value="">--danh mục--</option>
                {categories.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </select>
            </div>
          </div>

          <div className="list-product-item">
            {productsAdmin.length !== 0 ? (
              productsAdmin.map((product) => {
                return (
                  <ProductItem
                    key={product._id}
                    handleLoading={handleLoading}
                    product={product}
                  />
                );
              })
            ) : (
              <div>Danh mục sản phẩm trống</div>
            )}
          </div>
        </div>
      </div>
      <MoonLoader
        loading={loading}
        cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
};
export default ProductAdmin;
