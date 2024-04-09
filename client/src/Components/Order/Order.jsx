import React from "react";
import "./Order.css";
const Order = () => {
  return (
    <>
      <div className="order-customer">
        <h1 className="title-order">ĐƠN HÀNG CỦA BẠN</h1>
        <table className="table-order">
          <thead>
            <tr>
              <th>Đơn hàng</th>
              <th>Ngày đặt</th>
              <th>Địa chỉ</th>
              <th>Trạng thái thanh toán</th>
              <th>Tổng tiền</th>
              <th>Chi tiết</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>#abc123</td>
              <td>10/3/2002</td>
              <td>72, đường Cầu Diễn, Hà Nội</td>
              <td>Chưa thanh toán</td>
              <td>15,000,000đ</td>
              <td>
                <button>Xem</button>
              </td>
            </tr>
            <tr>
              <td>#abc123</td>
              <td>10/3/2002</td>
              <td>72, đường Cầu Diễn, Hà Nội</td>
              <td>Chưa thanh toán</td>
              <td>15,000,000đ</td>
              <td>
                <button>Xem</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Order;
