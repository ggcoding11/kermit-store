import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Loading from "../components/Loading";

import { getProductById } from "../services/ProductService";

const ProductView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [imageName, setImageName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductById(id)
      .then((product) => {
        setName(product.data.name);
        setBrand(product.data.brand);
        setPrice(product.data.price);
        setCategory(product.data.category);
        setImageName(product.data.imageName);
        setQuantity(product.data.quantity);
        setDescription(product.data.description);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const formatCategory = (category) => {
    return category
      .toLowerCase()
      .replaceAll("_", " ")
      .replace(/\b\w/g, (letra) => letra.toUpperCase());
  };

  return (
    <div className="container min-vh-100 d-flex flex-column p-2">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="row d-flex gap-2">
            <h1>{name}</h1>
            <h3 className="text-secondary">{brand}</h3>

            <img
              src={`http://localhost:8080/images/${imageName}`}
              className="img-fluid"
              alt={imageName}
            />

            <p className="fs-4">
              <span className="fw-bold">Price:</span>{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(price)}
            </p>
            <p className="fs-4">
              <span className="fw-bold">Category:</span>{" "}
              {formatCategory(category)}
            </p>
            <p className="fs-4">
              <span className="fw-bold">Quantity:</span> {quantity}
            </p>
            <p className="fs-4">
              <span className="fw-bold">Description:</span> {description}
            </p>

            <button className="btn btn-secondary" onClick={() => navigate("/")}>
              Back to home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductView;
