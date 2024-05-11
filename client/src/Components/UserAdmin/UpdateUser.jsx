import React, { useState, useContext, useEffect } from "react";
import "./UpdateUser.css";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState({});
  const { setCallBack, isLogged, token, users } = useContext(AppContext);
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
      if (isLogged === false) return alert("Please login or registerto use!");
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
        alert("Update user success!");
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
          <input
            required
            type="text"
            name="role"
            value={role}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button">
          Update User
        </button>
      </form>
    </>
  );
};
export default UpdateUser;
