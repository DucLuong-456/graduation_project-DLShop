import React, { useContext } from "react";
import "./ProductAdmin.css";
import ProductItem from "./ProductItem";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
const ProductAdmin = () => {
  const { products, setProducts, token, setCallBack, isLogged } =
    useContext(AppContext);
  console.log(products.data);
  const createProduct = () => {};
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
            {products.data.map((product) => {
              return <ProductItem key={product._id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductAdmin;
