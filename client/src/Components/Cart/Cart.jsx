import React, { useState, useContext, Fragment } from "react";
import "./Cart.css";
import btn_paypal from "../Assets/Image/Paypal-Donate-Elise-Ever-After.png";
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Cart = () => {
  const [isChecked, setIsChecked] = useState(false);
  const { cart, setCart, token, setCallBack, isLogged } =
    useContext(AppContext);
  const navigate = useNavigate();

  //handle paypal online
  const handlePaypalPayment = async (token, cart) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/order/payonline`,
        {},
        { headers }
      );
      console.log(res.data);
      window.open(res.data.url, "_blank");
      // setCallBack((cb) => !cb);
    } catch (error) {
      console.log(error);
      // alert(error.response.data.msg);
    }
  };
  //handle checkbox item
  const handleCheckAll = () => {
    const setDataChecked = cart.data.map((item) => {
      return { ...item, isChecked: true };
    });
    setCart({
      data: setDataChecked,
      total_money: handleTotalMoney(setDataChecked),
    });
  };

  const handleUncheckAll = () => {
    const setDataChecked = cart.data.map((item) => {
      return { ...item, isChecked: false };
    });
    setCart({
      data: setDataChecked,
      total_money: handleTotalMoney(setDataChecked),
    });
  };

  const handleCheck = (id) => {
    const setDataChecked = cart.data.map((item) => {
      if (item.product_id._id === id) {
        item.isChecked = !isChecked;
        setIsChecked((isChecked) => !isChecked);
      }
      return item;
    });
    setCart({
      data: setDataChecked,
      total_money: handleTotalMoney(setDataChecked),
    });
  };

  const handleTotalMoney = (data) => {
    const total_money = data.reduce((accumulator, item) => {
      if (item.isChecked)
        return accumulator + item.product_id.price * item.quanlity_product;
      else return accumulator + 0;
    }, 0);
    return total_money;
  };
  //delete cart
  const deleteProductCart = async (token, arrProductId) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/user/deleteCart`,
        {
          headers,
          data: {
            deleteProducstId: arrProductId,
          },
        }
      );
      console.log(res.data);
      // setCart({ ...cart, data: [...cart.data, res.data.data] });
      setCallBack((cb) => !cb);
      navigate("/cart");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="cart-product">
        <div className="cart-title">GIỎ HÀNG CỦA BẠN</div>
        {isLogged && cart.length !== 0 ? (
          <div className="detail-cart">
            <div className="btn-option-cart">
              <button className="select-all" onClick={handleCheckAll}>
                Chọn tất cả
              </button>
              <button className="unSelect-all" onClick={handleUncheckAll}>
                Bỏ chọn
              </button>
            </div>
            <table className="table-cart">
              <thead>
                <tr>
                  <th colspan="2">THÔNG TIN SẢN PHẨM</th>
                  <th>ĐƠN GIÁ</th>
                  <th>SỐ LƯỢNG</th>
                  <th>CHỌN</th>
                  <th className="thanh-tien-content">THÀNH TIỀN</th>
                </tr>
              </thead>
              <tbody className="cart-body">
                <td colSpan={6} className="line"></td>
                {cart.data.map((item) => {
                  return (
                    <tr>
                      <td className="div-cart-product-img">
                        <img
                          className="cart-product-img"
                          src={
                            process.env.REACT_APP_API_LINK_STATIC +
                            item.product_id.image
                          }
                          alt="anh"
                        />
                      </td>
                      <td>
                        <div className="cart-name-product">
                          {item.product_id.name}
                        </div>
                        <div
                          className="cart-delete-product"
                          onClick={() => {
                            deleteProductCart(token, [item.product_id._id]);
                          }}
                        >
                          Xóa
                        </div>
                      </td>
                      <td className="cart-cost-product">
                        {parseInt(item.product_id.price).toLocaleString(
                          "vi-VN",
                          {
                            style: "currency",
                            currency: "VND",
                          }
                        )}
                      </td>
                      <td className="cart-quanlity-product">
                        {item.quanlity_product}
                      </td>
                      <td className="check-box-product">
                        <input
                          type="checkbox"
                          name="select-product"
                          checked={item.isChecked}
                          onChange={() => {
                            handleCheck(item.product_id._id);
                          }}
                          id="product_id"
                        />
                      </td>
                      <td className="total-cost-product">
                        {parseInt(
                          item.product_id.price * item.quanlity_product
                        ).toLocaleString("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="cart-infor-active">
              <div className="continue-buy">
                <Link to="/">Tiếp tục mua hàng</Link>
              </div>
              <div className="cart-pay">
                <div className="title-cost-pay">
                  <div className="title-name">TỔNG TIỀN:</div>
                  <div className="title-cost">
                    {parseInt(cart.total_money).toLocaleString("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    })}
                  </div>
                </div>
                {cart.data.length === 0 ? (
                  Fragment
                ) : (
                  <>
                    <Link to="/payment">
                      <div className="cart-btn-pay">THANH TOÁN</div>
                    </Link>
                    <div
                      className="paypal-btn-pay"
                      onClick={() => {
                        console.log("check data cart: ", cart.data);
                        handlePaypalPayment(token, cart.data);
                      }}
                    >
                      <img src={btn_paypal} alt="btn-paypal" />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>Giỏ hàng rỗng</div>
        )}
      </div>
    </>
  );
};
export default Cart;
