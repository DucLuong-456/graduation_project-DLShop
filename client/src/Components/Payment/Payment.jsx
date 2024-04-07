import React from "react";
import "./Payment.css";
import { FaMoneyBillAlt } from "react-icons/fa";
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
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Họ và tên"
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Địa chỉ nhận hàng(tùy chọn)"
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Tỉnh thành"
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Quận huyện"
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Phường xã"
              name="address"
              className="address-pay"
            />
            <input
              type="text"
              placeholder="Địa chỉ nhận hàng"
              name="address"
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
