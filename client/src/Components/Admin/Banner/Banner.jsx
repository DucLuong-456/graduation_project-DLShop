import React, { useContext, useState } from "react";
import "./Banner.css";
import { AppContext } from "../../../Context/AppContext";
import { Link } from "react-router-dom";
import axios from "axios";
const Banner = () => {
  const { setCallBack, isLogged, banners } = useContext(AppContext);
  const [image, setImage] = useState("");
  const handleFileChange = (event) => {
    console.log("image change", event.target.files[0]);
    setImage(event.target.files[0]);
  };
  const updateBanner = async (id) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      console.log("image upload", image);

      const formData = new FormData();
      formData.append("file", image);
      try {
        await axios.put(
          `${process.env.REACT_APP_API_KEY}/api/upload/banner/${id}`,
          formData
        );
        setCallBack((cb) => !cb);
        setImage("");
        alert("Update banner success!");
      } catch (error) {
        console.log(error.response);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <>
      <div className="banner-title">
        <h1>Chỉnh Sửa Banner</h1>
      </div>
      <table className="Category-admin-table banner-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên banner</th>
            <th>Hình ảnh</th>
            <th>Tải lên</th>
            <th>Lựa chọn</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((item, index) => {
            return (
              <tr>
                <td>{++index}</td>
                <td>{item.name}</td>
                <td>
                  <img
                    className="image-banner"
                    src={process.env.REACT_APP_API_LINK_STATIC + item.image}
                    alt="anh"
                  />
                </td>
                <td>
                  {" "}
                  <input type="file" onChange={handleFileChange} />
                </td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => {
                      updateBanner(item._id);
                    }}
                  >
                    Sửa
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
export default Banner;
