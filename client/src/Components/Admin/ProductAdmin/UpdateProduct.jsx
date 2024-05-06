import React, { useState, useContext, useEffect } from "react";
import "./CreateProduct.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../../../Context/AppContext";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantityStock, setQuantityStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");

  const { id } = useParams();
  const [product, setProduct] = useState({});
  const { setCallBack, isLogged, token, categories, products } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const productCurrent = products.data.find((item) => {
      return item._id === id;
    });
    setProduct(productCurrent);
    setName(productCurrent.name);
    setStatus(productCurrent.status);
    setBrand(productCurrent.brand);
    setPrice(productCurrent.price);
    setQuantityStock(productCurrent.quanlity_stock);
    setDescription(productCurrent.description);
    setCategoryId(productCurrent.category_id);
    setImage(productCurrent.image);
  }, [id]);
  //handle file
  const handleFileChange = (event) => {
    let file = event.target.files[0];
    if (!file) file = product.image;
    setImage(file);
  };
  //admin
  const updateProduct = async (token, productData) => {
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
        console.log(key, productData[key]);
      }
      try {
        const res = await axios.put(
          `${process.env.REACT_APP_API_KEY}/api/product/${product._id}`,
          formData,
          { headers }
        );
      } catch (error) {
        console.log(error);
      }

      setCallBack((cb) => !cb);
      alert("Update product success!");
      navigate("/admin/product");
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
      case "status":
        setStatus(value);
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
      status,
      price,
      quanlity_stock: quantityStock,
      description,
      category_id: categoryId,
    };
    updateProduct(token, productData);
  };

  return (
    <>
      <h2>UPDATE PRODUCT</h2>
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="form-group">
          <label>
            Name:
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
            Brand:
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
            Status:
            <select
              type="text"
              name="status"
              value={status}
              onChange={handleInputChange}
              className="form-input"
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Price:
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
            Quantity Stock:
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
            Description:
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
            Category
            <select
              type="text"
              name="categoryId"
              value={categoryId}
              onChange={handleInputChange}
              className="form-input"
            >
              {categories.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <div className="form-group">
          <label>
            Image:
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="form-input-file"
            />
          </label>
          <img
            className="image-update-product"
            src={process.env.REACT_APP_API_LINK_STATIC + product.image}
            alt="anh"
          />
        </div>

        <button type="submit" className="submit-button">
          Update Product
        </button>
      </form>
    </>
  );
};

export default UpdateProduct;
