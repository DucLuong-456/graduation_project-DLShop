import React from "react";
import "./ProductAdmin.css";
import ProductItem from "./ProductItem";
const ProductAdmin = () => {
  return (
    <>
      <div className="product-admin">
        <div className="product-admin-title">
          <div className="name-product-title">Products</div>
          <div className="create-new-product">Create new</div>
        </div>
        <div className="product-content">
          <div className="product-input-filter">
            <input type="text" placeholder="search..." />
            <div>
              <select name="cars" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
              <select name="createdAt" id="cars">
                <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
              </select>
            </div>
          </div>

          <div className="list-product-item">
            <ProductItem />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductAdmin;
