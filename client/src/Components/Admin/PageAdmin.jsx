import React from "react";
import "./PageAdmin.css";
import Sidebar from "./Sidebar/Sidebar";
import Header from "./Header/Header";
const PageAdmin = ({ children }) => {
  return (
    <>
      <div className="home-page-admin">
        <Sidebar />
        <div className="header-content">
          <Header />
          <div>{children}</div>
        </div>
      </div>
    </>
  );
};
export default PageAdmin;
