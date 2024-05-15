import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { AppContext } from "../../../Context/AppContext";

import axios from "axios";
const Register = () => {
  const navigate = useNavigate();
  const { setIsLogged, setToken } = useContext(AppContext);
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
    phone_number: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/user/register`,
        {
          ...user,
        }
      );
      alert("Đăng ký tài khoản thành công!");
      navigate("/login");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="login-body">
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form onSubmit={registerSubmit} action="POST">
              <h1>Create Account</h1>
              <div className="social-container">
                <Link to="#" className="social">
                  <FaFacebook className="icon-form" />
                </Link>
                <Link to="#" className="social">
                  <FaGoogle className="icon-form" />
                </Link>
                <Link to="#" className="social">
                  <FaLinkedin className="icon-form" />
                </Link>
              </div>
              <span>or use your email for registration</span>

              <input type="text" placeholder="Address" name="address" />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={user.email}
                onChange={onChangeInput}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={onChangeInput}
              />
              <input
                type="text"
                placeholder="verify password"
                name="password"
              />
              <button type="submit">Sign Up</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn">
                  <Link to="/login" className="custom-link-change">
                    Sign In
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;
