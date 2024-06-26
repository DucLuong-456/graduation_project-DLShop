import React, { useState, useContext, useEffect } from "react";
import "./UpdateUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import Swal from "sweetalert2";

import axios from "axios";
const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});
  const { setCallBack, isLogged, isAdmin, token, users } =
    useContext(AppContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const userCurrent = users.find((item) => {
      return item._id === id;
    });
    setUser(userCurrent);
    setName(userCurrent.name);
    setAddress(userCurrent.address);
    setPhoneNumber(userCurrent.phone_number);
    setStatus(userCurrent.status);
    setRole(userCurrent.role_id);
    setEmail(userCurrent.email);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "phone_number":
        setPhoneNumber(value);
        break;
      case "status":
        setStatus(value);
        break;
      case "role":
        setRole(value);
        break;
      default:
        break;
    }
  };

  const updateUser = async (token, userData) => {
    try {
      if (isAdmin === false) return alert("Please login use account admin");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const formData = new FormData();

      for (let key in userData) {
        formData.append(key, userData[key]);
      }
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_KEY}/api/user/update/${id}`,
          formData,
          { headers }
        );
        setCallBack((cb) => !cb);
        Swal.fire({
          title: "SUCCESS!",
          text: "Update user success",
          icon: "success",
          confirmButtonText: "ok",
        });
        // alert("Update user success!");
        navigate("/admin/user");
      } catch (error) {
        alert(error.response.data.msg);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  //handle sumit
  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      name,
      email,
      phone_number: phoneNumber,
      address,
      role_id: role,
      status,
    };
    updateUser(token, userData);
  };
  return (
    <>
      <h2>UPDATE USER</h2>
      <form onSubmit={handleSubmit} className="create-category-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            required
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Phone number:</label>
          <input
            required
            type="text"
            name="phone_number"
            value={phoneNumber}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            required
            type="text"
            name="address"
            value={address}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            required
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <input
            required
            type="text"
            name="status"
            value={status}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select
            name="role"
            value={role}
            onChange={handleInputChange}
            style={{ width: "300px" }}
          >
            {arrRole.map((item) => {
              return <option value={item.id}>{item.role}</option>;
            })}
          </select>
          {/* <input
            required
            type="text"
            name="role"
            value={role}
            onChange={handleInputChange}
            className="form-input"
          /> */}
        </div>
        <button type="submit" className="submit-button">
          Cập nhật
        </button>
      </form>
    </>
  );
};

const arrRole = [
  { id: 2, role: "Admin" },
  { id: 1, role: "User" },
  { id: 3, role: "Staff" },
];
export default UpdateUser;
