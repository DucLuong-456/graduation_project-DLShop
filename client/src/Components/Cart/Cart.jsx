import React, { useContext } from "react";
import "./Cart.css";
// import cart_img from '../Assets/Image/cart.jpg'
import { AppContext } from "../../Context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Cart = () => {
  const { cart, token, setCallBack, isLogged } = useContext(AppContext);
  const navigate = useNavigate();
  //addToCart
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
      //console.log(error);
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="cart-product">
        <div className="cart-title">GIỎ HÀNG CỦA BẠN</div>
        {isLogged && cart.length !== 0 ? (
          <div className="detail-cart">
            <table>
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
                        <input type="checkbox" name="select-product" id="" />
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
                <div className="cart-btn-pay">THANH TOÁN</div>
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
