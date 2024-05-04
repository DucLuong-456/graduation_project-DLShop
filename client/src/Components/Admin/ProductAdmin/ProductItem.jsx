import React from "react";
import "./ProductAdmin.css";
import { FaPen } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import format_money from "../../../helpers/fomat.money";
const ProductItem = ({ product }) => {
  return (
    <>
      <div className="product-item-admin">
        <div className="img-item-admin">
          <img
            src={process.env.REACT_APP_API_LINK_STATIC + product.image}
            alt="anh"
          />
        </div>
        <span>{product.name}</span>
        <span>{format_money(product.price)}</span>
        <div className="option-admin-active">
          <div className="update-product-btn">
            <FaPen />
          </div>
          <div className="delete-product-btn">
            <ImBin />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
