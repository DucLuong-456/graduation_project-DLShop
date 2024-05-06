import React, { useState, useContext } from "react";
import "./CreateCategory.css";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate } from "react-router-dom";

import axios from "axios";
const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [indexDisplay, setIndexDisplay] = useState(0);
  const { setCallBack, isLogged, token } = useContext(AppContext);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "indexDisplay":
        setIndexDisplay(value);
        break;
      default:
        break;
    }
  };

  const addNewCategory = async (token, categorytData) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", image);
      for (let key in categorytData) {
        formData.append(key, categorytData[key]);
      }
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_KEY}/api/category`,
          formData,
          { headers }
        );
        setCallBack((cb) => !cb);
        alert("Add category success!");
        navigate("/admin/category");
      } catch (error) {
        alert(error.response.data.msg);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  //handle file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  //handle sumit
  const handleSubmit = (event) => {
    event.preventDefault();
    const categorytData = {
      name,
      index_display: indexDisplay,
    };

    addNewCategory(token, categorytData);
  };

  return (
    <>
      <h2>ADD CATEGORY</h2>
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
          <label>Index display:</label>
          <input
            required
            type="text"
            name="indexDisplay"
            value={indexDisplay}
            onChange={handleInputChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Image-icon:</label>
          <input
            required
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-input-file"
          />
        </div>

        <button type="submit" className="submit-button">
          Create Category
        </button>
      </form>
    </>
  );
};
export default CreateCategory;
