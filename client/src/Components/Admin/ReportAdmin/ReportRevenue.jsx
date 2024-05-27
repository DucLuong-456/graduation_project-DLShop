import React, { useContext, useState, useEffect } from "react";
import "../CategoryAdmin/CategoryAdmin.css";
import "./ReportAdmin.css";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import format_money from "../../../helpers/fomat.money";

import axios from "axios";
const ReportRevenue = () => {
  const { isLogged, token, products, categories } = useContext(AppContext);
  const [productsAdmin, setProductAdmin] = useState([products.data]);
  const [keySearch, setKeySearch] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  const handleExportExcel = async (data, token) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/report/export/profit`,
        {
          dataExport: data,
        },
        { headers }
      );

      return res.data.url;
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleDowloadExcle = async (productsAdmin, token) => {
    const result = window.confirm("Xác nhận tải xuống file excel?");
    if (result) {
      const url = await handleExportExcel(productsAdmin, token);
      console.log("url====", url);
      window.open(url, "_blank");
    }
  };

  const handleSearchByName = (event) => {
    const { value } = event.target;
    setKeySearch(value);
  };

  const handleFilterByCategory = (event) => {
    const { value } = event.target;
    setFilter(value);
  };

  const sortProductByTotal = (event) => {
    const { value } = event.target;
    setSort(value);
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

    if (sort === "ASC") {
      filterProduct = filterProduct.sort(
        (a, b) => a.quanlity_sold * a.price - b.quanlity_sold * b.price
      );
    } else if (sort === "DESC") {
      filterProduct = filterProduct.sort(
        (a, b) => b.quanlity_sold * b.price - a.quanlity_sold * a.price
      );
    }

    setProductAdmin(filterProduct);
  }, [keySearch, filter, sort, products]);

  return (
    <>
      <div className="category-title">
        <h1>BÁO CÁO DOANH THU</h1>
        <Link to="">
          <button
            onClick={() => {
              handleDowloadExcle(productsAdmin, token);
            }}
          >
            Xuất excel
          </button>
        </Link>
      </div>
      <div className="product-report-input-filter">
        <input
          type="text"
          placeholder="search product..."
          onChange={handleSearchByName}
        />
        <div>
          <select name="cars" id="cars" onChange={handleFilterByCategory}>
            <option value="">--danh mục--</option>
            {categories.map((item) => {
              return <option value={item._id}>{item.name}</option>;
            })}
          </select>
        </div>
        <div style={{ marginLeft: "200px" }}>
          <select
            name="total_money"
            id="total_money"
            onChange={sortProductByTotal}
          >
            <option value="">-- sắp xếp theo tổng tiền --</option>
            <option value="ASC">Tăng dần</option>;
            <option value="DESC">Giảm dần</option>;
          </select>
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
export default ReportRevenue;
