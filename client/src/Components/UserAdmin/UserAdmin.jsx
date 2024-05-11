import "./UserAdmin.css";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";
// import Swal from "sweetalert2";
import axios from "axios";
const UserAdmin = () => {
  const { setCallBack, isLogged, token, users } = useContext(AppContext);
  const deleteUser = async (token, isLogged, user_id) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      await axios.delete(
        `${process.env.REACT_APP_API_KEY}/api/user/deleteUser/${user_id}`,
        {
          headers,
        }
      );
      setCallBack((cb) => !cb);
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleDeleteUser = (token, isLogged, user_id) => {
    const result = window.confirm("Bạn có chắc muốn xóa!");
    if (result) {
      deleteUser(token, isLogged, user_id);
    }
  };
  return (
    <>
      <div className="category-title">
        <h1>Người dùng</h1>
        <Link to="/admin/user">
          <button>Tạo mới</button>
        </Link>
      </div>
      <table className="Category-admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Trạng thái</th>
            <th>Quyền</th>
            <th>Sửa </th>
            <th>Xóa</th>
          </tr>
        </thead>
        <tbody>
          {users.map((item, index) => {
            return (
              <tr>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td> {item.address}</td>
                <td> {item.phone_number}</td>
                <td> {item.status ? "đang hoạt động" : "Ngừng hoạt động"}</td>
                <td> {item.role_id == 1 ? "User" : "admin"}</td>

                <td>
                  <Link to={"/admin/updateUser/" + item._id}>
                    <button className="edit-btn">Edit</button>
                  </Link>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => {
                      handleDeleteUser(token, isLogged, item._id);
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
export default UserAdmin;
