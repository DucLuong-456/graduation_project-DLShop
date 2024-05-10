import React, { useContext, useState, useEffect } from "react";
import "../CategoryAdmin/CategoryAdmin.css";
import "./ReportAdmin.css";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import format_money from "../../../helpers/fomat.money";
import { OrderStatus } from "../../../helpers/order_status.enum";
import moment from "moment";
import axios from "axios";
const ReportRevenueOrder = () => {
  const { orders, token } = useContext(AppContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [order, setOrder] = useState([]);
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    console.log(event.target.value);
  };

  const handleEndDateChange = (event) => {
    console.log(event.target.value);
    setEndDate(event.target.value);
  };
  const handleFilter = async (token) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/order/filter/date?startDate=${startDate}T00:00:00Z&endDate=${endDate}T00:00:00Z`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOrder(response.data.data);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  useEffect(() => {}, [order]);
  return (
    <>
      <div className="category-title">
        <h1>BÁO CÁO DOANH THU</h1>
        <Link to="/admin/create_category">
          <button>Export excel</button>
        </Link>
      </div>
      <div className="order-report-input-filter">
        <div style={{ marginLeft: "20px" }}>
          <label htmlFor="">From: </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor="">To: </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <button
          onClick={() => {
            handleFilter(token);
          }}
        >
          Filter
        </button>
      </div>

      <table className="Category-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã đơn hàng</th>
            <th>Tổng sản phẩm</th>
            <th>Trạng thái</th>
            <th>Thanh toán</th>
            <th>Tổng tiền</th>
            <th width="200px">Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {order.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.total_product}</td>

                <td>{handleOrderStatus(item.order_status_id)}</td>
                <td>
                  {item.payment_status ? "Đã thanh toán" : "Chưa thanh toán"}
                </td>

                <td>{format_money(item.total_money)}</td>
                <td>{moment(order.createdAt).format("DD/MM/YYYY - HH:mm")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const handleOrderStatus = (order_status_id) => {
  return order_status_id === 1
    ? OrderStatus.pending
    : order_status_id === 2
    ? OrderStatus.delivering
    : order_status_id === 3
    ? OrderStatus.delivered
    : order_status_id === 4
    ? OrderStatus.cancel
    : "Đang xử lý";
};
export default ReportRevenueOrder;
