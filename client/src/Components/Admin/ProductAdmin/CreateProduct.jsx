import React, { useState, useContext } from "react";
import "./CreateProduct.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";
const CreateProduct = () => {
  //upload multifile
  // const [selectedFiles, setSelectedFiles] = useState([]);

  // const handleMultiFileChange = (e) => {
  //   setSelectedFiles(Array.from(e.target.files));
  // };

  // const handleUpload = async () => {
  //   const formData = new FormData();
  //   selectedFiles.forEach((file) => {
  //     formData.append("files", file);
  //   });

  //   try {
  //     const response = await axios.post(
  //       `${process.env.REACT_APP_API_KEY}/api/upload`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error uploading files: ", error);
  //   }
  // };

  //create product
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantityStock, setQuantityStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");

  const { setCallBack, isLogged, token, categories } = useContext(AppContext);
  const navigate = useNavigate();

  //handle file
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };
  //admin
  const addProduct = async (token, productData) => {
    try {
      if (isLogged === false) return alert("Please login or registerto use!");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      };
      const formData = new FormData();
      formData.append("image", image);
      for (let key in productData) {
        formData.append(key, productData[key]);
      }
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_KEY}/api/product`,
          formData,
          { headers }
        );
        setCallBack((cb) => !cb);
        alert("Add product success!");
        navigate("/admin/product");
      } catch (error) {
        alert(error.response.data.msg);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case "name":
        setName(value);
        break;

      case "brand":
        setBrand(value);
        break;
      case "price":
        setPrice(value);
        break;
      case "quantityStock":
        setQuantityStock(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "categoryId":
        setCategoryId(value);
        break;
      case "image":
        setImage(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the form data (e.g., create a product)
    const productData = {
      name,
      brand,
      price,
      quanlity_stock: quantityStock,
      description,
      category_id: categoryId,
    };

    addProduct(token, productData);
  };

  return (
    <>
      <h2 style={{ fontSize: "25px", marginTop: "10px" }}>THÊM SẢN PHẨM</h2>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label>
            Tên sản phẩm:
            <input
              required
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Nhãn hiệu:
            <input
              required
              type="text"
              name="brand"
              value={brand}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Giá:
            <input
              required
              type="text"
              name="price"
              value={price}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Số lượng tồn kho:
            <input
              required
              type="text"
              name="quantityStock"
              value={quantityStock}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Mô tả:
            <input
              required
              type="text"
              name="description"
              value={description}
              onChange={handleInputChange}
              className="form-input"
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Danh mục:
            <select
              type="text"
              name="categoryId"
              onChange={handleInputChange}
              className="form-input"
            >
              {categories.map((category) => {
                return <option value={category._id}>{category.name}</option>;
              })}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Hình ảnh chính:
            <input
              required
              type="file"
              name="image"
              onChange={handleFileChange}
              className="form-input-file"
            />
          </label>
        </div>
        {/* <div className="form-group">
          <label>
            Hình ảnh khác:
            <input type="file" multiple onChange={handleMultiFileChange} />
          </label>
        </div> */}
        <button type="submit" className="submit-button">
          Tạo sản phẩm
        </button>
      </form>
    </>
  );
};

export default CreateProduct;
