import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Header.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBellFill } from "react-icons/bs";
import logo4 from "../../Assets/Image/logo4.png";
import { Link } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";
// import Alert from "@mui/material/Alert";
import { socket } from "../../../helpers/socket.client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Header = () => {
  const { isLogged } = useContext(AppContext);
  const [notification, setNotification] = useState([]);
  // const [message,setMessage] = useState("")
  useEffect(() => {
    socket.on("sendMessage", (data) => {
      console.log("check data", data);
      // setMessage(data.message);
      toast(data.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setNotification((notifi) => [...notifi, data.message]);
    });

    return () => {
      socket.off("sendMessage");
    };
  }, []);
  return (
    <>
      <div className="header-admin">
        <div className="title-header">
          <CiDeliveryTruck className="icon-header" />
          Nhanh, tiết kiệm, ...
        </div>
        <div className="user-header">
          {/* <BsBellFill className="icon-header" /> */}

          <Link to="/cart">
            <BsBellFill className="header-category-icon" />
          </Link>
          <div className="nav-cart-count">
            {isLogged ? notification.length : 0}
          </div>
          <div className="user-header-image">
            <img src={logo4} alt="avatar" />
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        containerId={"friendRequest"}
      />
      <ToastContainer />
    </>
  );
};
export default Header;
