import React from "react";
import "./ProductAdmin.css";
import { FaPen } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import img_dt from "../../Assets/Image/detail_product1.jpg";
const ProductItem = () => {
  return (
    <>
      <div className="product-item-admin">
        <div className="img-item-admin">
          <img src={img_dt} alt="anh" />
        </div>
        <span>Velcro Ballerinas For Girls (Pink)</span>
        <span>$89</span>
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