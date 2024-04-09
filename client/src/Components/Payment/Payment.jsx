import React from "react";
import "./Payment.css";
import { FaMoneyBillAlt } from "react-icons/fa";
import cart_img from "../Assets/Image/cart.jpg";

const Payment = () => {
  return (
    <>
      <div className="payment-body">
        <div className="payment-infor">
          <h2>Thông tin nhận hàng</h2>
          <div className="form-infor-pay">
            <input
              type="text"
              placeholder="Email"
              name="email"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Họ và tên"
              name="fullName"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              name="phoneNumber"
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
              className="address-pay"
            />
          </div>
        </div>
        <div className="payment-tranport">
          <h2>Vận chuyển</h2>
          <div className="noti-payment">Vui lòng nhập thông tin giao hàng</div>
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
          <h2 className="title-payment">Đơn hàng (3 sản phẩm)</h2>
          <div class="list-product-payment">
            <h2>Danh sách sản phẩm</h2>
            <div class="scrollable-list">
              <ul>
                <li>
                  <img src={cart_img} alt="anh" />
                  <div className="name-product-payment">
                    Redmi Note 12 Turbo 8GB/256GB
                  </div>
                </li>
                <li>
                  <img src={cart_img} alt="anh" />
                  <div className="name-product-payment">
                    Redmi Note 12 Turbo 8GB/256GB
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="voucher-payment">
            <input type="text" placeholder="Nhập mã giảm giá" />
            <div className="btn-ap-dung">Áp dụng</div>
          </div>
          <div className="phi-van-chuyen">
            <span>Phí vận chuyển</span>
            <span>13.280.000₫</span>
          </div>
          <div className="line-payment"></div>
          <div className="tong-cong">
            <span>Tổng cộng</span>
            <span>13.280.000₫</span>
          </div>

          <div className="div-dat-hang">
            <span>Quay về giỏ hàng</span>
            <div className="btn-dat-hang">Đặt hàng</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Payment;
