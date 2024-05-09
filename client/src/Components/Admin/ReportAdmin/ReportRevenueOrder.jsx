import React, { useContext, useState, useEffect } from "react";
import "../CategoryAdmin/CategoryAdmin.css";
import "./ReportAdmin.css";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import format_money from "../../../helpers/fomat.money";

import axios from "axios";
const ReportRevenueOrder = () => {
  const { setCallBack, isLogged, token, products, categories } =
    useContext(AppContext);
  const [productsAdmin, setProductAdmin] = useState([products.data]);
  const [keySearch, setKeySearch] = useState("");
  const [filter, setFilter] = useState("");
  const handleSearchByName = (event) => {
    const { value } = event.target;
    setKeySearch(value);
  };

  const handleFilterByCategory = (event) => {
    const { value } = event.target;
    setFilter(value);
  };
  useEffect(() => {
    let filterProduct = products.data.filter((item) => {
      return item.name.toLowerCase().includes(keySearch);
    });

    if (filter !== "") {
      filterProduct = products.data.filter((item) => {
        return item.category_id.includes(filter);
      });
    }

    setProductAdmin(filterProduct);
  }, [keySearch, filter, products]);

  return (
    <>
      <div className="category-title">
        <h1>BÁO CÁO DOANH THU</h1>
        <Link to="/admin/create_category">
          <button>Export excel</button>
        </Link>
      </div>
      <div className="order-report-input-filter">
        <div style={{ marginLeft: "200px" }}>
          <label htmlFor="">From: </label>
          <input type="date" />
        </div>
        <div>
          <label htmlFor="">To: </label>
          <input type="date" />
        </div>
      </div>

      <table className="Category-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Đơn vị tính</th>
            <th>Số Lượng tồn</th>
            <th>Số Lượng đã bán</th>
            <th width="300px">Tổng tiền</th>
          </tr>
        </thead>
        <tbody>
          {productsAdmin.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item._id}</td>
                <td>{item.name}</td>

                <td>Chiếc</td>
                <td>{item.quanlity_stock}</td>
                <td>{item.quanlity_sold}</td>

                <td>{format_money(item.quanlity_sold * item.price)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default ReportRevenueOrder;
