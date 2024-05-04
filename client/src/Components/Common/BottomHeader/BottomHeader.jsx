import React, { useState, useContext } from "react";
import "./BottomHeader.css";
import { TbCategory } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
import axios from "axios";
const DropDownLogin = ({ isLogged, token, handleLogout }) => {
  return isLogged === false ? (
    <div className="login-options">
      <ul>
        <Link to="/login">
          <li>Đăng nhập</li>
        </Link>
        <Link to="/register">
          <li>Đăng ký</li>
        </Link>
      </ul>
    </div>
  ) : (
    <div className="login-options">
      <ul>
        <Link to="/#">
          <li>Profile</li>
        </Link>
        <Link to="/order">
          <li>Đơn mua</li>
        </Link>
        <Link
          to="/"
          onClick={() => {
            handleLogout(token);
          }}
        >
          <li>Đăng xuất</li>
        </Link>
      </ul>
    </div>
  );
};

const BottomHeader = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { cart, isLogged, token, setToken, setIsLogged } =
    useContext(AppContext);

  const navigate = useNavigate();
  const handleLogout = async (token) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/api/user/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setIsLogged(false);
      setToken("");
      localStorage.clear();
      navigate("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="header">
        <div className="header-row">
          <div className="header-title-menu">
            <div className="category-icon">
              <TbCategory
                className="header-category-icon"
                style={{
                  color: "#ffffff",
                }}
              />
            </div>
            <span className="category-name">Danh mục sản phẩm</span>
          </div>
          <div className="header-center">
            <ul className="category-list-name">
              <li>
                <Link to="/admin">admin</Link>
              </li>
              <span className="category-pagi">|</span>
              <li>
                <Link to="/login">login</Link>
              </li>

              <span className="category-pagi">|</span>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <span className="category-pagi">|</span>
              <li>
                <Link to="/order">Order</Link>
              </li>
              <span className="category-pagi">|</span>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <span className="category-pagi">|</span>
              <li>
                <Link to="/payment">payment</Link>
              </li>
            </ul>
          </div>
          <div className="header-right">
            <div
              className="user-icon"
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <Link
                to="#"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <div className="login-icon-header">
                  <AiOutlineUser className="header-category-icon" />
                  {isHovered === true && (
                    <DropDownLogin
                      isLogged={isLogged}
                      token={token}
                      handleLogout={handleLogout}
                    />
                  )}
                </div>
              </Link>
            </div>
            <div
              className="user-icon shopping-cart"
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <Link to="/cart">
                <AiOutlineShoppingCart className="header-category-icon" />
              </Link>
              <div className="nav-cart-count">
                {isLogged ? cart.data.length : 0}
              </div>
            </div>

            <div
              className="user-icon heart-icon"
              style={{
                backgroundColor: "#ffffff",
              }}
            >
              <AiOutlineHeart className="header-category-icon" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BottomHeader;
