import React, { useEffect, useState, useContext, Fragment } from "react";
import "./Content.css";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsBagCheckFill } from "react-icons/bs";
import { TbBaguette } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
import format_money from "../../../helpers/fomat.money";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import moment from "moment";
const Content = () => {
  const [totalSale, setTotalSale] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const { setCallBack, isLogged, token, products, orders } =
    useContext(AppContext);

  useEffect(() => {
    setTotalSale(
      orders.orders.reduce((accumulator, current) => {
        return accumulator + current.total_money;
      }, 0)
    );
    setTotalOrder(orders.orders.length);
    setTotalProduct(products.data.length);
  }, [orders, products]);
  return (
    <>
      <div className="content-admin">
        <div className="content-header">
          <h2>DASH BOARD</h2>
        </div>

        <div className="list-iteam">
          <div className="item-content">
            <div className="icon-item">
              <RiMoneyDollarCircleFill className="icon-item-i" />
            </div>
            <div className="content-item">
              <div className="content-item-title">Total Sales</div>
              <div className="value-title-item">{format_money(totalSale)}</div>
            </div>
          </div>
          <div className="item-content ">
            <div className="icon-item order-icon-b">
              <BsBagCheckFill className="icon-item-i order-icon" />
            </div>
            <div className="content-item">
              <div className="content-item-title">Total Orders</div>
              <div className="value-title-item">{totalOrder}</div>
            </div>
          </div>
          <div className="item-content">
            <div className="icon-item product-icon-b">
              <TbBaguette className="icon-item-i product-icon" />
            </div>
            <div className="content-item">
              <div className="content-item-title">Total Products</div>
              <div className="value-title-item">{totalProduct}</div>
            </div>
          </div>
        </div>

        <div className="lastest-order">
          <h2>Latest orders</h2>
          <div className="list-order-lastest">
            <table>
              <thead>
                <th>TT</th>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Tổng tiền</th>
                <th>Ngày đặt</th>
                <th>Trạng thái</th>
                <th>Chi tiết</th>
              </thead>
              {orders.orders.map((item, index) => {
                if (index <= 10)
                  return (
                    <tr>
                      <td>{index}</td>
                      <td>{item._id.slice(0, 5)}</td>
                      <td>{orders.user_name}</td>
                      <td>{format_money(item.total_money)}</td>
                      <td>
                        {moment(item.createdAt).format("DD/MM/YYYY - HH:mm")}
                      </td>
                      <td>
                        {item.order_status_id === 1
                          ? "Đang xác nhận"
                          : "Đang giao"}
                      </td>
                      <td>
                        <Link to={"/order_detail/" + item._id}>
                          <FaEye />
                        </Link>
                      </td>
                    </tr>
                  );
                else return Fragment;
              })}
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Content;
