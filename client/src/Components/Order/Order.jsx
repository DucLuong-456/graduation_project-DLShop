import React, { useContext } from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import moment from "moment";
const Order = () => {
  const { orders, isLogged } = useContext(AppContext);
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
            {/* nguoc thi thong bao don hang rong */}
            {isLogged === true &&
              orders.orders.map((order) => {
                return (
                  <tr>
                    <td className="order-id">{order._id}</td>
                    <td>
                      {moment(order.createdAt).format("DD/MM/YYYY - HH:mm")}
                    </td>
                    <td>{order.order_address}</td>
                    <td>
                      {order.payment_status
                        ? "Đã thanh toán"
                        : "Chưa thanh toán"}
                    </td>
                    <td>
                      {parseInt(order.total_money).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      <Link to={"/order_detail/" + order._id}>
                        <button>Xem</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
};
export default Order;
