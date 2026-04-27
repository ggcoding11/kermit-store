import React, { useEffect, useState } from "react";
import { MdSort } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import "../css/Home.css";
import { motion } from "framer-motion";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { getAllProducts } from "../services/ProductService";

const Home = () => {
  const [products, setProducts] = useState(null);
  const [params, setParams] = useState(null);

  useEffect(() => {
    getAllProducts(params)
      .then((products) => {
        setProducts(products.data);
      })
      .catch((error) => console.log(error));
  }, [params]);

  const navigate = useNavigate();

  const [openDelete, setOpenDelete] = useState(false);
  const onOpenModalDelete = () => setOpenDelete(true);
  const onCloseModalDelete = () => setOpenDelete(false);

  const [openSort, setOpenSort] = useState(false);
  const onOpenModalSort = () => setOpenSort(true);
  const onCloseModalSort = () => setOpenSort(false);

  const [idToDelete, setIdToDelete] = useState("");

  const deleteProduct = () => {
    alert("Produto " + idToDelete + " foi deletado!");
  };

  return (
    <div className="container min-vh-100">
      <Header />
      <section>
        <div className="row gy-2 mb-4">
          <div className="col-12 col-sm-7 d-flex justify-content-center justify-content-sm-start gap-2">
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-primary"
              onClick={() => navigate("/create")}
            >
              New product
            </motion.button>
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn btn-secondary"
              title="Sort products"
              onClick={() => onOpenModalSort()}
            >
              <MdSort />
            </motion.button>
          </div>
          <div className="col-12 col-sm-5 d-flex justify-content-end">
            <div className="search-bar input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search here!"
              />
              <span
                role="button"
                className="input-group-text"
                title="Search the product"
                onClick={() => alert("Olá")}
              >
                <CiSearch />
              </span>
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Brand</th>
                    <th scope="col">Category</th>
                    <th scope="col">Image</th>
                    <th scope="col">Created at</th>
                    <th scope="col">Price</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((product) => (
                      <tr key={product.id}>
                        <th scope="row">{product.id}</th>
                        <td>{product.name}</td>
                        <td>{product.brand}</td>
                        <td>{product.category}</td>
                        <td>{product.imageName}</td>
                        <td>{product.creationDate}</td>
                        <td>
                          {new Intl.NumberFormat("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          }).format(product.price)}
                        </td>
                        <td className="d-flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-primary"
                            onClick={() => navigate(`/update/${product.id}`)}
                          >
                            Edit
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn btn-danger"
                            onClick={() => {
                              onOpenModalDelete();
                              setIdToDelete(product.id);
                            }}
                          >
                            Delete
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12 d-flex justify-content-center">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <a className="page-link" href="#">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </section>

      <Modal
        open={openDelete}
        onClose={onCloseModalDelete}
        center
        showCloseIcon={false}
        classNames={{
          modal: "customModal",
        }}
      >
        <div className="d-flex flex-column gap-2">
          <h1 className="text-center fs-4">
            Do you want to delete this product?
          </h1>

          <div className="d-flex justify-content-evenly">
            <button className="btn btn-danger" onClick={() => deleteProduct()}>
              Deletar
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => onCloseModalDelete()}
            >
              Fechar
            </button>
          </div>
        </div>
      </Modal>

      <Modal
        open={openSort}
        onClose={onCloseModalSort}
        center
        classNames={{
          modal: "customModalSort",
        }}
      >
        <div className="d-flex flex-column gap-2">
          <h1 className="text-center fs-3">Sort products</h1>

          <div>
            <h3 className="fs-4">By product id:</h3>

            <div className="d-flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={() => {
                  setParams({ field: "id", direction: "asc" });
                }}
              >
                Ascending
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-danger"
                onClick={() => {
                  setParams({ field: "id", direction: "desc" });
                }}
              >
                Descending
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="fs-4">By product name:</h3>

            <div className="d-flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={() => {
                  setParams({ field: "name", direction: "asc" });
                }}
              >
                A-Z
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-danger"
                onClick={() => {
                  setParams({ field: "name", direction: "desc" });
                }}
              >
                Z-A
              </motion.button>
            </div>
          </div>

          <div>
            <h3 className="fs-4">By price:</h3>

            <div className="d-flex gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={() => {
                  setParams({ field: "price", direction: "asc" });
                }}
              >
                Ascending
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-danger"
                onClick={() => {
                  setParams({ field: "price", direction: "desc" });
                }}
              >
                Descending
              </motion.button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Home;
