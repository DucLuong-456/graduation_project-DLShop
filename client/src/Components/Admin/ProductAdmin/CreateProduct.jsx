import React, { useState } from "react";
import "./CreateProduct.css";
const CreateProduct = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [quantitySold, setQuantitySold] = useState("");
  const [quantityStock, setQuantityStock] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [image, setImage] = useState("");

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
      case "quantitySold":
        setQuantitySold(value);
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
      status,
      brand,
      price,
      quantitySold,
      quantityStock,
      description,
      categoryId,
      image,
    };

    console.log(productData);

    // Perform any further actions (e.g., API calls, state updates)
    // ...
  };

  return (
    <form onSubmit={handleSubmit} className="create-product-form">
      <div className="form-group">
        <label>
          Name:
          <input
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
          Status:
          <input
            type="text"
            name="status"
            value={status}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Brand:
          <input
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
          Price:
          <input
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
          Quantity Sold:
          <input
            type="text"
            name="quantitySold"
            value={quantitySold}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Quantity Stock:
          <input
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
          Category ID:
          <input
            type="text"
            name="categoryId"
            value={categoryId}
            onChange={handleInputChange}
            className="form-input"
          />
        </label>
      </div>
      <div className="form-group">
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleInputChange}
            className="form-input-file"
          />
        </label>
      </div>

      <button type="submit" className="submit-button">
        Create Product
      </button>
    </form>
  );
};

export default CreateProduct;
