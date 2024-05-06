import React, { useContext, useEffect, useState } from "react";
import "./ProductAdmin.css";
import ProductItem from "./ProductItem";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
const ProductAdmin = () => {
  const { products, categories, setProducts, token, setCallBack, isLogged } =
    useContext(AppContext);
  const [productsAdmin, setProductAdmin] = useState([products.data]);
  const [keySearch, setKeySearch] = useState("");
  const [filter, setFilter] = useState("");
  const handleSearchByName = (event) => {
    const { value } = event.target;
    setKeySearch(value);
  };

  const handleFilterByCategory = (event) => {
    const { value } = event.target;
    setFilter(value);
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

    setProductAdmin(filterProduct);
  }, [keySearch, filter, products]);

  return (
    <>
      <div className="product-admin">
        <div className="product-admin-title">
          <div className="name-product-title">Products</div>
          <Link to="/admin/create_product">
            {" "}
            <div className="create-new-product">Create new</div>
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
              <select name="createdAt" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>

          <div className="list-product-item">
            {productsAdmin.length !== 0 ? (
              productsAdmin.map((product) => {
                return <ProductItem key={product._id} product={product} />;
              })
            ) : (
              <div>Danh mục sản phẩm trống</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductAdmin;
