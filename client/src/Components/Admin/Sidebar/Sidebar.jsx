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
  return (
    <>
      <div className={`sidebar-admin ${sidebarCollapsed ? "collapsed" : ""}`}>
        <div className="logo-admin">
          <img src={logo_admin} alt="" />
          <FaBarsStaggered className="icon-bar-admin" onClick={handleClick} />
        </div>

        <div className="menu-link-admin">
          <div className="item-menu-admin active">
            <ImHome3 className=" icon-home-admin" />
            <Link to="/admin">
              <div className="title-item-admin">Dashboard</div>
            </Link>
          </div>
          <div className="item-menu-admin">
            <FaShoppingBag className="icon-home-admin" />
            <Link to="/admin/product">
              <div className="title-item-admin">Products</div>
            </Link>
          </div>
          <div className="item-menu-admin">
            <BsCartPlusFill className="icon-home-admin" />
            <div className="title-item-admin">Add product</div>
          </div>
          <div className="item-menu-admin">
            <BiSolidCategory className="icon-home-admin" />
            <div className="title-item-admin">Categories</div>
          </div>
          <div className="item-menu-admin">
            <RiShoppingBag3Fill className="icon-home-admin" />
            <div className="title-item-admin">Orders</div>
          </div>
          <div className="item-menu-admin">
            <FaUser className="icon-home-admin" />
            <div className="title-item-admin">Users</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
