import React from "react";
import "./Advertise.css";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsBox2 } from "react-icons/bs";
import { IoWalletOutline } from "react-icons/io5";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
const Advertise = () => {
  return (
    <>
      <div className="list-avertise">
        <div className="advertise">
          <div className="ad-icon">
            <CiDeliveryTruck className="advertise-icon" />
          </div>
          <div className="advertise-text">
            <p>Vận chuyển MIỄN PHÍ</p>
            <p>Trong khu vực TP.HCM</p>
          </div>
        </div>

        <div className="advertise">
          <div className="ad-icon">
            <BsBox2 className="advertise-icon" />
          </div>
          <div className="advertise-text">
            <p>Đổi trả MIỄN PHÍ</p>
            <p>Trong vòng 30 NGÀY</p>
          </div>
        </div>

        <div className="advertise">
          <div className="ad-icon">
            <IoWalletOutline className="advertise-icon" />
          </div>
          <div className="advertise-text">
            <p>Tiến hành THANH TOÁN</p>
            <p>Với nhiều PHƯƠNG THỨC</p>
          </div>
        </div>

        <div className="advertise">
          <div className="ad-icon">
            <RiMoneyPoundCircleLine className="advertise-icon" />
          </div>
          <div className="advertise-text">
            <p> 100% HOÀN TIỀN</p>
            <p>nếu sản phẩm lỗi</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Advertise;
