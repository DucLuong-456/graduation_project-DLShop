import React, { useContext, useState, useEffect } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
import format_money from "../../helpers/fomat.money";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const { user, cart, token, setCallBack, isLogged } = useContext(AppContext);
  const navigate = useNavigate();
  const payment_method = {
    online: "Chuyển khoản",
    money: "Thanh toán khi nhận hàng",
  };

  const [orderProduct, setOrderProduct] = useState({
    data: [],
    total_money: 0,
  });
  const findProductOrder = (cart) => {
    setOrderProduct({
      data: cart.data.filter((item) => {
        return item.isChecked === true;
      }),
      total_money: cart.total_money,
    });
  };

  const createOrder = async (orderProduct, token) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/order`,
        {
          productsIdSelected: orderProduct.data.map((item) => {
            return item.product_id._id;
          }),
          total_money: orderProduct.total_money,
          payment_method: payment_method.money,
          order_address:
            "Xóm 5, phường Như trạch, quận lạc hồng, thành phố Đông sơn",
        },
        { headers }
      );
      setCallBack((cb) => !cb);
      alert("order success!");
      navigate("/order_detail/123");
    } catch (error) {
  
      alert(error.response.data.msg);
    }
  };

  useEffect(() => {
    findProductOrder(cart);
  }, []);

  return (
    <>
      {isLogged && (
        <div className="payment-body">
          <div className="payment-infor">
            <h2>Thông tin nhận hàng</h2>
            <div className="form-infor-pay">
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={user.email}
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Họ và tên"
                name="fullName"
                value={user.name}
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Số điện thoại"
                name="phoneNumber"
                value={user.phone_number}
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Tỉnh thành phố"
                name="district"
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Quận huyện"
                name="district"
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Phường xã"
                name="ward"
                className="address-pay"
              />
              <input
                type="text"
                placeholder="Địa chỉ nhận hàng"
                name="deliveryAddress"
                value={user.address}
                className="address-pay"
              />
            </div>
          </div>
          <div className="payment-tranport">
            <h2>Vận chuyển</h2>
            <div className="noti-payment">
              Vui lòng nhập thông tin giao hàng
            </div>
            <h2>Thanh toán</h2>
            <div className="payment-method-center">
              <div className="payment-method-box">
                <div>
                  <input
                    type="radio"
                    name="payment-method"
                    className="payment-method"
                  />
                  <span> Thanh toán khi nhận hàng</span>
                </div>
                <FaMoneyBillAlt className="icon-money-payment" />
              </div>

              <div className="payment-method-box">
                <div>
                  <input
                    type="radio"
                    name="payment-method"
                    className="payment-method"
                  />
                  <span>Chuyển khoản</span>
                </div>
                <FaMoneyBillAlt className="icon-money-payment" />
              </div>
            </div>
          </div>

          <div className="payment-order-infor">
            <h2 className="title-payment">
              Đơn hàng ({orderProduct.data.length} sản phẩm)
            </h2>
            <div class="list-product-payment">
              <h2>Danh sách sản phẩm</h2>
              <div class="scrollable-list">
                <ul>
                  {orderProduct.data.map((item) => {
                    return (
                      <li>
                        <img
                          src={
                            process.env.REACT_APP_API_LINK_STATIC +
                            item.product_id.image
                          }
                          alt="anh"
                        />
                        <div className="name-product-payment">
                          {item.product_id.name}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="voucher-payment">
              <input type="text" placeholder="Nhập mã giảm giá" />
              <div className="btn-ap-dung">Áp dụng</div>
            </div>
            <div className="phi-van-chuyen">
              <span>Phí vận chuyển</span>
              <span>20.000₫</span>
            </div>
            <div className="line-payment"></div>
            <div className="tong-cong">
              <span>Tổng cộng</span>
              <span>{format_money(orderProduct.total_money)}</span>
            </div>

            <div className="div-dat-hang">
              <span>Quay về giỏ hàng</span>
              <div
                className="btn-dat-hang"
                onClick={() => {
                  createOrder(orderProduct, token);
                }}
              >
                Đặt hàng
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Payment;
