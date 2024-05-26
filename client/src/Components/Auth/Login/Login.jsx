import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import axios from "axios";
import "./Login.css";
import { AppContext } from "../../../Context/AppContext";
import { socket } from "../../../helpers/socket.client";

const Login = () => {
  const navigate = useNavigate();
  const { setIsLogged, setIsAdmin, setToken } = useContext(AppContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_KEY}/api/user/login`,
        {
          ...user,
        }
      );
      socket.emit("login", {
        token: res.data.accessToken,
        role: res.data.user.role_id,
      });
      localStorage.setItem("Login", true);
      localStorage.setItem("accessToken", res.data.accessToken);
      setIsLogged(true);
      setToken(res.data.accessToken);
      if (res.data.user.role_id === 1) navigate("/");
      else navigate("/admin");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="login-body">
        <div className="container" id="container">
          <div className="form-container sign-in-container">
            <form onSubmit={loginSubmit} method="POST">
              <h1>Sign in</h1>
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
              <span>or use your account</span>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={onChangeInput}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={onChangeInput}
              />
              <Link to="#">Forgot your password?</Link>
              <button type="submit" style={{ cursor: "pointer" }}>
                Sign In
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button className="ghost" id="signUp">
                  <Link to="/register" id="custom-link-change">
                    Sign Up
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
export default Login;
