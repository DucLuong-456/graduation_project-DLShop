import React, { useState, useContext, useEffect } from "react";
import "./CreateCategory.css";
import { AppContext } from "../../../Context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

import axios from "axios";
const UpdateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [indexDisplay, setIndexDisplay] = useState("");
  const [category, setCategory] = useState({});
  const { setCallBack, isLogged, token, categories } = useContext(AppContext);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const categoryCurrent = categories.find((item) => {
      return item._id === id;
    });
    setCategory(categoryCurrent);
    setName(categoryCurrent.name);
    setIndexDisplay(categoryCurrent.index_display);
    setImage(categoryCurrent.image);
  }, []);

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

  const updateCategory = async (token, categorytData) => {
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
        const res = await axios.put(
          `${process.env.REACT_APP_API_KEY}/api/category/${id}`,
          formData,
          { headers }
        );
        setCallBack((cb) => !cb);
        alert("Update category success!");
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
    let file = event.target.files[0];
    if (!file) file = category.icon_category;
    setImage(file);
  };

  //handle sumit
  const handleSubmit = (event) => {
    event.preventDefault();
    const categorytData = {
      name,
      index_display: indexDisplay,
    };

    updateCategory(token, categorytData);
  };

  return (
    <>
      <h2>UPDATE CATEGORY</h2>
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
            type="file"
            name="image"
            onChange={handleFileChange}
            className="form-input-file"
          />

          <img
            className="image-update-product"
            src={process.env.REACT_APP_API_LINK_STATIC + category.icon_category}
            alt="anh"
          />
        </div>

        <button type="submit" className="submit-button">
          Update Category
        </button>
      </form>
    </>
  );
};
export default UpdateCategory;
