import React, { useContext, useState, useEffect } from "react";
import "../CategoryAdmin/CategoryAdmin.css";
import "../ReportAdmin/ReportAdmin.css";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import format_money from "../../../helpers/fomat.money";
import { OrderStatus } from "../../../helpers/order_status.enum";
import moment from "moment";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import "./OrderAdmin.css";
import { FaEye } from "react-icons/fa";

const OrderAdmin = () => {
  const { orders, token } = useContext(AppContext);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [order, setOrder] = useState(orders.orders);
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
  useEffect(() => {
    // console.log("check order: ", order, "type", typeof item);
  }, [order]);
  return (
    <>
      <div className="category-title order">
        <h1>ĐƠN HÀNG</h1>
        <Link to="/admin/create_category">
          <button>Tạo mới</button>
        </Link>
      </div>

      <div className="order-report-input-filter">
        <div style={{ marginLeft: "20px" }}>
          <label htmlFor="">From: </label>
          <input
            style={{ width: "150px", padding: "10px" }}
            type="date"
            id="startDate"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div>
          <label htmlFor="">To: </label>
          <input
            style={{ width: "150px", padding: "10px" }}
            type="date"
            id="endDate"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div
          style={{
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%", // Makes the div circular
            backgroundColor: "#ccc", // Background color for the div
            padding: "10px", // Padding around the icon
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Adds a subtle shadow
            transition: "background 0.3s ease", // Smooth transition on background change
          }}
        >
          <FaSearch
            style={{
              cursor: "pointer", // Changes cursor to pointer on hover
              transition: "background 0.3s ease", // Smooth transition on background change
            }}
            onClick={() => {
              handleFilter(token);
            }}
          />
        </div>
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
            <th width="100px">Chi tiết</th>
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
                <td>{moment(item.createdAt).format("DD/MM/YYYY - HH:mm")}</td>
                <td>
                  <Link to={"/admin/order_detail/" + item._id}>
                    <FaEye style={{ color: "#198754" }} />
                  </Link>
                </td>
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
export default OrderAdmin;
