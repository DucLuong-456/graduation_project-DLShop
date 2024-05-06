import React, { useState } from "react";
import "./Sidebar.css";
import { FaBarsStaggered } from "react-icons/fa6";
import { ImHome3 } from "react-icons/im";
import { FaShoppingBag } from "react-icons/fa";
import { BsCartPlusFill } from "react-icons/bs";
import { BiSolidCategory } from "react-icons/bi";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import logo_admin from "../../Assets/Image/logo.png";
import { Link } from "react-router-dom";
const Sidebar = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const handleClick = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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
              <div className="title-item-admin">Dashboard</div>
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
              <div className="title-item-admin">Products</div>
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
              <div className="title-item-admin">Add product</div>
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
              <div className="title-item-admin">Categories</div>
            </Link>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "orders" ? "active" : ""
            }`}
            onClick={() => handleItemClick("orders")}
          >
            <RiShoppingBag3Fill className="icon-home-admin" />
            <div className="title-item-admin">Orders</div>
          </div>
          <div
            className={`item-menu-admin ${
              activeItem === "users" ? "active" : ""
            }`}
            onClick={() => handleItemClick("users")}
          >
            <FaUser className="icon-home-admin" />
            <div className="title-item-admin">Users</div>
          </div>
        </div>
        <div
          className={`item-menu-admin ${
            activeItem === "users" ? "active" : ""
          }`}
          onClick={() => handleItemClick("users")}
        >
          <FaUser className="icon-home-admin" />
          <div className="title-item-admin">Thống kê báo cáo</div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
