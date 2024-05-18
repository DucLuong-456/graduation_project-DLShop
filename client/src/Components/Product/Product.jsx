import React, { useContext } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { AiFillStar, AiOutlinePlusCircle } from "react-icons/ai";
import "./Product.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
const Product = ({ product }) => {
  const { setCallBack, isLogged, token } = useContext(AppContext);
  const navigate = useNavigate();

  //addToCart
  const addToCart = async (token, product_id) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/user/addTocart`,
        {
          product_id: product_id,
          quanlity_product: 1,
        },
        { headers }
      );
      setCallBack((cb) => !cb);
      alert("Add product success on cart");
      navigate("/cart");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
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
        <Link to={"detail_product/" + product._id}>
          <p className="title-product-name">{product.name}</p>
        </Link>
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
          <Link>
            <div
              className="div-cart-icon"
              onClick={() => {
                addToCart(token, product._id);
              }}
            >
              <BsCartPlus className="cart-icon" />
            </div>
          </Link>
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
