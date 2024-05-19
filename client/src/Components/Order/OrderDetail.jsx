import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./OrderDetail.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import moment from "moment";
import format_money from "../../helpers/fomat.money";
import { OrderStatus } from "../../helpers/order_status.enum";
const OrderDetail = () => {
  const [user, setUser] = useState({});
  const { isLogged, token } = useContext(AppContext);
  const [order, setOrder] = useState({});
  const [orderDetail, setOrderDetail] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    const getOrder = async (id, token) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_KEY}/api/order/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response.data);
        setOrder({
          ...response.data,
          user_id: response.data.user_id._id,
          order_detail: [],
        });
        setUser(response.data.user_id);
        setOrderDetail(response.data.order_detail);
      } catch (error) {
        alert(error.response.data.msg);
      }
    };
    getOrder(id, token);
  }, [id]);
  return (
    <>
      <h1 className="order-detail-title">CHI TIẾT ĐƠN HÀNG</h1>
      <div className="order-detail">
        <div className="right-order-detail">
          <div className="box-ma-don-hang">
            <div className="ma-don-hang">
              <p>
                Đơn hàng: <span>#{order._id}</span>
              </p>
              <p>{moment(order.createdAt).format("DD/MM/YYYY - HH:mm")}</p>
            </div>
            <div className="trang-thai-don-hang">
              {handleOrderStatus(order.order_status_id)}
            </div>
          </div>
          <div className="nguoi-nhan">
            <div className="title-nguoi-nhan">NGƯỜI NHẬN</div>
            <div className="infor-nguoi-nhan">
              <p className="ten-nguoi-nhan">{user.name}</p>
              <p>{user.phone_number}</p>
              <p>{order.order_address}</p>
            </div>
          </div>

          <div className="infor-product-order">
            <table className="table-detail-order">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th>Tổng tiền</th>
                </tr>
              </thead>
              <tbody>
                {orderDetail.map((item) => {
                  return (
                    <tr>
                      <td>{item.product_id.name}</td>
                      <td>{item.quanlity_product}</td>
                      <td>{format_money(item.product_id.price)}</td>
                      <td>
                        {format_money(
                          item.product_id.price * item.quanlity_product
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="left-order-detail">
          <div className="payment-method-div">
            <div className="phuong-thuc-payment">PHƯƠNG THỨC THANH TOÁN</div>
            <div className="ten-phuong-thuc">Thanh toán khi nhận hàng</div>
            <div className="tong-tien">
              Tổng tiền: <span>{format_money(order.total_money)}</span>
            </div>
          </div>

          <div className="chi-tiet-thanh-tien">
            <div className="text-1">
              <div className="tam-tinh">Tạm tính</div>
              <div className="cost-thanh-tien">
                {format_money(order.total_money)}
              </div>
            </div>
            <div className="text-1">
              <div className="tam-tinh">Phí vận chuyển</div>
              <div className="cost-thanh-tien">miễn phí</div>
            </div>
            <div className="text-1">
              <div className="tam-tinh">Mã giảm giá</div>
              <div className="cost-thanh-tien">-30,000</div>
            </div>
            <div className="text-1">
              <div className="tam-tinh">Thành tiền</div>
              <div className="cost-thanh-tien">
                {format_money(order.total_money - 30000)}
              </div>
            </div>
            <div className="text-2">
              <div className="can-thanh-toan">Cần thanh toán</div>
              <div className="cost-thanh-tien">
                {format_money(order.total_money - 30000)}
              </div>
            </div>
          </div>

          <div className="lua-chon-don-hang">
            <div className="ghi-chu">Ghi chú</div>
            <div className="huy-don">Hủy đơn</div>
          </div>

          <div className="close-don-hang">Đóng</div>
        </div>
      </div>
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
export default OrderDetail;
