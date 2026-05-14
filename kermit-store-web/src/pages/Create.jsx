import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NumericFormat } from "react-number-format";
import { motion } from "framer-motion";
import { Modal } from "react-responsive-modal";

import { createProduct } from "../services/ProductService";

import "react-responsive-modal/styles.css";
import "../css/Create.css";

const MAX_LENGTH_TEXT = 200;

const Create = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [creationDate, setCreationDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const [blockSubmit, setBlockSubmit] = useState(false);

  const handleCreate = (e) => {
    e.preventDefault();

    setBlockSubmit(true);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);
    formData.append("creationDate", creationDate);
    formData.append("quantity", quantity);
    formData.append("description", description);

    createProduct(formData)
      .then(() => {
        onOpenModal();
      })
      .catch((error) => console.log(error));
  };

  const [openModal, setOpenModal] = useState(false);
  const onOpenModal = () => setOpenModal(true);
  const onCloseModal = () => {
    setOpenModal(false);
    navigate("/");
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center p-2">
      <h1 className="text-center mb-4">New product</h1>

      <form onSubmit={handleCreate}>
        <div className="mb-3">
          <label className="form-label w-100">
            Name:
            <input
              type="text"
              placeholder="Xbox 360"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={MAX_LENGTH_TEXT}
              required
            />
          </label>
        </div>

        <div className="mb-3">
          <label className="form-label w-100">
            Brand:
            <input
              type="text"
              placeholder="Microsoft"
              className="form-control"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              maxLength={MAX_LENGTH_TEXT}
              required
            />
          </label>
        </div>

        <div className="row gy-3 mb-3">
          <div className="col-12 col-sm-6">
            <label className="form-label w-100">
              Price:
              <NumericFormat
                placeholder="R$ 0,00"
                prefix="R$ "
                decimalScale={2}
                fixedDecimalScale={true}
                allowNegative={false}
                thousandSeparator="."
                decimalSeparator=","
                className="form-control"
                value={price}
                onValueChange={(values) => setPrice(values.floatValue)}
                required
              />
            </label>
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label w-100">
              Category:
              <select
                className="form-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select the category</option>
                <option value="ELECTRONICS">Electronics</option>
                <option value="CLOTHING">Clothing</option>
                <option value="FOOD">Food</option>
                <option value="BEVERAGES">Beverages</option>
                <option value="BOOKS">Books</option>
                <option value="HOME_APPLIANCES">Home Appliances</option>
                <option value="FURNITURE">Furniture</option>
                <option value="BEAUTY">Beauty</option>
                <option value="HEALTH">Health</option>
                <option value="SPORTS">Sports</option>
                <option value="TOYS">Toys</option>
                <option value="AUTOMOTIVE">Automotive</option>
                <option value="OFFICE_SUPPLIES">Office Supplies</option>
                <option value="PET_SUPPLIES">Pet Supplies</option>
                <option value="OTHER">Other</option>
              </select>
            </label>
          </div>
        </div>

        <div className="row gy-3 mb-3">
          <div className="col-12 col-sm-6">
            <label className="form-label w-100">
              Product image:
              <input
                className="form-control"
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </label>
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label w-100">
              Quantity:
              <NumericFormat
                placeholder="0"
                allowNegative={false}
                decimalScale={0}
                className="form-control"
                value={quantity}
                onValueChange={(values) => setQuantity(values.floatValue)}
                required
              />
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label w-100">
            Description:
            <textarea
              placeholder="The product includes: 1 console, 2 controllers, and 1 accessory (Kinect)."
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={MAX_LENGTH_TEXT}
              required
            />
          </label>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-4">
          <motion.button
            type="submit"
            disabled={blockSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-create btn btn-primary"
          >
            Create
          </motion.button>

          <motion.button
            onClick={() => navigate("/")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="btn-cancel btn btn-danger"
          >
            Cancel
          </motion.button>
        </div>
      </form>

      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        showCloseIcon={false}
        classNames={{
          modal: "customModalCreated",
        }}
      >
        <h1 className="text-center fs-3">The product was created!</h1>

        <div className="text-center">New data was added to the database</div>
      </Modal>
    </div>
  );
};

export default Create;
