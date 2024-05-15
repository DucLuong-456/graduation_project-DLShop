import React, { useState, useContext } from "react";
import "./ChangePassword.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../../Context/AppContext";

import axios from "axios";
const ChangePassword = () => {
  const { setIsLogged, token, isLogged } = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    password: "",
    newPassword: "",
    rePassword: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.put(
        `${process.env.REACT_APP_API_KEY}/api/user/changePassword`,

        { ...user },
        { headers }
      );
      alert("Thay đổi mật khẩu thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="change-pass-form">
        <h1>ĐỔI MẬT KHẨU</h1>
        <form onSubmit={registerSubmit} action="PUT">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={onChangeInput}
          />
          <input
            type="password"
            placeholder="new password"
            name="newPassword"
            value={user.newPassword}
            onChange={onChangeInput}
          />
          <input
            type="password"
            placeholder="re password"
            name="rePassword"
            value={user.rePassword}
            onChange={onChangeInput}
          />
          <button type="submit">Gửi</button>
        </form>
      </div>
    </>
  );
};
export default ChangePassword;
