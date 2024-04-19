import React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import "./Product.css";
import { Link } from "react-router-dom";
const Product = ({ product }) => {
  return (
    <>
      <div className="product-item">
        <div className="img-product-item">
          <img
            src={process.env.REACT_APP_API_LINK_STATIC + product.image}
            alt="anh"
          />
          <AiOutlineHeart className="heart-icon-product" />
          <div className="type-product">sản phẩm MỚI</div>
        </div>
        <p className="title-product-name">{product.name}</p>
        <div className="cost-product-item-cart">
          <div className="cost-product">
            <span className="cost-product-item">
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
            <span className="sale-product-item">35.0000.000đ</span>
          </div>
          <div className="div-cart-icon">
            <BsCartPlus className="cart-icon" />
          </div>
        </div>
        <div className="khuyen-mai-content">
          Tặng Củ sạc nhanh Samsung 25W Type C chính hãng
        </div>
        <div className="danh-gia-product">
          <div className="left-dg">
            <AiFillStar className="start-icon-product" />
            <AiFillStar className="start-icon-product" />
            <AiFillStar className="start-icon-product" />
            <AiFillStar className="start-icon-product" />
            <AiFillStar className="start-icon-product" />
          </div>

          <Link to={"detail_product/" + product._id}>
            <div className="right-dg">
              <AiOutlinePlusCircle />
              <div>chi tiết</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default Product;
