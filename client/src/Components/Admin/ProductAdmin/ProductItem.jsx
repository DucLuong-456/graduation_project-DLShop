import React, { useContext, useState } from "react";
import "./ProductAdmin.css";
import { FaPen } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import format_money from "../../../helpers/fomat.money";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
const ProductItem = ({ product, handleLoading }) => {
  const { token, setCallBack, isLogged } = useContext(AppContext);
  const deleteProduct = async (token, isLogged, product_id) => {
    try {
      if (isLogged === false)
        Swal.fire({
          title: "ERROR!",
          text: "please login or regster to use!",
          icon: "error",
          confirmButtonText: "ok",
        });
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/product/${product_id}`,
        {
          headers,
        }
      );
      handleLoading(true);
      setCallBack((cb) => {
        return !cb;
      });
    } catch (error) {
      Swal.fire({
        title: "ERROR!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "ok",
      });
    }
  };

  const handleDeleteProduct = async (token, isLogged, product_id) => {
    const result = await Swal.fire({
      title: "Warning",
      text: "Bạn có chắc muốn xóa không?",
      icon: "warning",
      confirmButtonText: "ok",
      cancelButtonText: "cancel",
      showCancelButton: true,
    });
    if (result.isConfirmed) {
      deleteProduct(token, isLogged, product_id);
    }
  };
  return (
    <>
      <div className="product-item-admin">
        <div className="img-item-admin">
          <img
            src={process.env.REACT_APP_API_LINK_STATIC + product.image}
            alt="anh"
          />
        </div>
        <span style={{ fontWeight: "500", margin: "5px 5px" }}>
          {product.name}
        </span>
        <span>{format_money(product.price)}</span>
        <div className="option-admin-active">
          <div className="update-product-btn">
            <Link to={"/admin/update_product/" + product._id}>
              <FaPen className="pen-icon" />
            </Link>
          </div>

          <div
            className="delete-product-btn"
            onClick={() => {
              handleDeleteProduct(token, isLogged, product._id);
            }}
          >
            <ImBin />
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductItem;
