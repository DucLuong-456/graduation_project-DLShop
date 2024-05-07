import React, { useContext } from "react";
import "./UserInfor.css";
import { AppContext } from "../../Context/AppContext";

const UserInfor = () => {
  const { setCallBack, isLogged, token, user } = useContext(AppContext);

  return (
    <>
      <div className="user-infor">
        <div className="slider-left">
          <ul>
            <li>TRANG TÀI KHOẢN</li>
            <li>--- ----</li>
            <li>Thông tin tài khoản</li>
            <li>Đổi mật khẩu</li>
            <li>Đăng xuất</li>
          </ul>
        </div>
        <div className="slider-right">
          <ul>
            <li>THÔNG TIN TÀI KHOẢN</li>
            <li>
              <span style={{ fontWeight: 500 }}>Họ tên:</span> {user.name}
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>Email:</span> {user.email}
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>Phone:</span>{" "}
              {user.phone_number}
            </li>
            <li>
              <span style={{ fontWeight: 500 }}>Address:</span> {user.address}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default UserInfor;
