import React from "react";
import "./Content.css";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { BsBagCheckFill } from "react-icons/bs";
import { TbBaguette } from "react-icons/tb";
import { FaEye } from "react-icons/fa";
const Content = () => {
  return (
    <>
      <div className="content-admin">
        <div className="content-header">
          <h2>DashBoard</h2>
        </div>

        <div className="list-iteam">
          <div className="item-content">
            <div className="icon-item">
              <RiMoneyDollarCircleFill className="icon-item-i" />
            </div>
            <div className="content-item">
              <div className="content-item-title">Total Sales</div>
              <div className="value-title-item">$22,678</div>
            </div>
          </div>
          <div className="item-content ">
            <div className="icon-item order-icon-b">
              <BsBagCheckFill className="icon-item-i order-icon" />
            </div>
            <div className="content-item">
              <div className="content-item-title">Total Orders</div>
              <div className="value-title-item">130</div>
            </div>
          </div>
          <div className="item-content">
            <div className="icon-item product-icon-b">
              <TbBaguette className="icon-item-i product-icon" />
            </div>
            <div className="content-item">
              <div className="content-item-title">Total Products</div>
              <div className="value-title-item">70</div>
            </div>
          </div>
        </div>

        <div className="lastest-order">
          <h2>Latest orders</h2>
          <div className="list-order-lastest">
            <table>
              <tr>
                <td>User</td>
                <td>user@example.com</td>
                <td>$345</td>
                <td>Paid At Today at 10:13 AM</td>
                <td>Today at 10:13 AM</td>
                <td>
                  <FaEye />
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};
export default Content;
