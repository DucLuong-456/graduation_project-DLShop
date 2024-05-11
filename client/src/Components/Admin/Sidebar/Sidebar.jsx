import React, { useState } from "react";
import "./Sidebar.css";
import { FaAngleDown } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa";
import { FaBarsStaggered } from "react-icons/fa6";
import { ImHome3 } from "react-icons/im";
import { FaShoppingBag } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import logo_admin from "../../Assets/Image/logo.png";
import { TbReport } from "react-icons/tb";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isCloseReport, setIsCloseReport] = useState(false);
  const handleClick = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleClickReport = () => {
    setIsCloseReport((cb) => !cb);
  };

  const [activeItem, setActiveItem] = useState("dashboard");

  const handleItemClick = (itemName) => {
    setActiveItem(itemName);
  };
  return (
    <>
      <div className={`sidebar-admin ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="logo-admin">
          <img src={logo_admin} alt="" />
          <FaBarsStaggered className="icon-bar-admin" onClick={handleClick} />
        </div>

        <div className="menu-link-admin">
          <div
            className={`item-menu-admin ${
              activeItem === "dashboard" ? "active" : ""
            }`}
            onClick={() => handleItemClick("dashboard")}
          >
            <ImHome3 className="icon-home-admin" />
            <Link to="/admin">
              <div className="title-item-admin">Home</div>
            </Link>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "products" ? "active" : ""
            }`}
            onClick={() => handleItemClick("products")}
          >
            <FaShoppingBag className="icon-home-admin" />
            <Link to="/admin/product">
              <div className="title-item-admin">Sản phẩm</div>
            </Link>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "add_product" ? "active" : ""
            }`}
            onClick={() => handleItemClick("add_product")}
          >
            <BsCartPlusFill className="icon-home-admin" />
            <Link to="/admin/create_product">
              <div className="title-item-admin">Thêm sản phẩm</div>
            </Link>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "categories" ? "active" : ""
            }`}
            onClick={() => handleItemClick("categories")}
          >
            <BiSolidCategory className="icon-home-admin" />
            <Link to="/admin/category">
              <div className="title-item-admin">Danh mục</div>
            </Link>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "orders" ? "active" : ""
            }`}
            onClick={() => handleItemClick("orders")}
          >
            <RiShoppingBag3Fill className="icon-home-admin" />
            <Link to="/admin/order">
              <div className="title-item-admin">Đơn hàng</div>
            </Link>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "users" ? "active" : ""
            }`}
            onClick={() => handleItemClick("users")}
          >
            <FaUser className="icon-home-admin" />
            <Link to="/admin/user">
              <div className="title-item-admin">Người dùng</div>
            </Link>
          </div>
        </div>
        <div
          className={`item-menu-admin par-report ${
            activeItem === "reports" ? "active" : ""
          }`}
          onClick={() => {
            handleItemClick("reports");
            handleClickReport();
          }}
        >
          <TbReport className="icon-home-admin" />
          <Link>
            {" "}
            <div className="title-item-admin ">Thống kê báo cáo</div>
          </Link>
          {isCloseReport ? <FaAngleUp /> : <FaAngleDown />}
          {isCloseReport && (
            <ul className="sub-cate-report">
              <Link to="/admin/report/stock">
                <li>Báo cáo tồn kho</li>
              </Link>
              <Link to="/admin/report/product_revenue">
                <li>Doanh thu theo product</li>
              </Link>
              <Link to="/admin/report/order_revenue">
                <li>Doanh thu theo order</li>
              </Link>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
export default Sidebar;
