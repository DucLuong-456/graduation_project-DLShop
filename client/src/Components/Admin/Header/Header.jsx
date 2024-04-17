import React from "react";
import "./Header.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBellFill } from "react-icons/bs";
import logo_admin from "../../Assets/Image/logo.png";

const Header = () => {
  return (
    <>
      <div className="header-admin">
        <div className="title-header">
          <CiDeliveryTruck className="icon-header" />
          Nhanh, tiết kiệm, ...
        </div>
        <div className="user-header">
          <BsBellFill className="icon-header" />
          <div className="user-header-image">
            <img src={logo_admin} alt="avatar" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Header;
