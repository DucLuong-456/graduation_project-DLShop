import React,{useContext} from "react";
import "./Order.css";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

const Order = () => {
  const { orders,isLogged } = useContext(AppContext);
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
          {isLogged ===true && orders.map((order)=>{
            return (
              <tr>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td>{order.order_address}</td>
              <td>{order.payment_status?"Đã thanh toán" :"Chưa thanh toán"}</td>
              <td>15,000,000đ</td>
              <td>
              <Link to={"/order_detail/"+order._id}><button>Xem</button></Link>
              </td>
            </tr>)
          })}
            
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
