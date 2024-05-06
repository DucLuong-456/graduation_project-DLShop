import React, { useContext } from "react";
import "./CategoryAdmin.css";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";
const CategoryAdmin = () => {
  const { setCallBack, isLogged, token, categories } = useContext(AppContext);
  const deleteCategory = async (token, isLogged, category_id) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/category/${category_id}`,
        {
          headers,
        }
      );
      setCallBack((cb) => !cb);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleDeleteCategory = (token, isLogged, category_id) => {
    const result = window.confirm("Bạn có chắc muốn xóa!");
    if (result) {
      deleteCategory(token, isLogged, category_id);
    }
  };
  return (
    <>
      <div className="category-title">
        <h1>Category</h1>
        <Link to="/admin/create_category">
          <button>New Category</button>
        </Link>
      </div>
      <table className="Category-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Image</th>
            <th>Index_display</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((item) => {
            return (
              <tr>
                <td>{item._id}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    className="image-update-product"
                    src={
                      process.env.REACT_APP_API_LINK_STATIC + item.icon_category
                    }
                    alt="anh"
                  />
                </td>
                <td> {item.index_display}</td>

                <td>
                  <Link to={"/admin/update_category/" + item._id}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      handleDeleteCategory(token, isLogged, item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default CategoryAdmin;
