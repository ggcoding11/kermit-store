import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Modal } from "react-responsive-modal";

import { MdSort } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import {
  BsArrowDownUp,
  BsPencilSquare,
  BsSortDown,
  BsSortUp,
} from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";

import { getProducts, deleteProduct } from "../services/ProductService";
import { formatCategory } from "../utils/FormatCategory";

import Loading from "../components/Loading";
import Header from "../components/Header";

import "../css/Home.css";
import "react-responsive-modal/styles.css";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState(null);

  const [search, setSearch] = useState("");
  const [field, setField] = useState("");
  const [direction, setDirection] = useState("");

  const [reload, setReload] = useState(null);
  const [loading, setLoading] = useState(true);
  const [blockSubmit, setBlockSubmit] = useState(false);

  useEffect(() => {
    setLoading(true);

    getProducts({ search, field, direction })
      .then((products) => {
        setProducts(products.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, [search, field, direction, reload]);

  const [openDelete, setOpenDelete] = useState(false);
  const onOpenModalDelete = () => setOpenDelete(true);
  const onCloseModalDelete = () => setOpenDelete(false);

  const [idToDelete, setIdToDelete] = useState("");

  const handleDelete = () => {
    setBlockSubmit(true);

    deleteProduct(idToDelete)
      .then((response) => {
        setReload(response);
        onCloseModalDelete();
      })
      .catch((error) => console.log(error))
      .finally(() => setBlockSubmit(false));
  };

  const SortButton = (props) => {
    const sortByField = (field) => {
      setField(field);

      direction === "desc" ? setDirection("asc") : setDirection("desc");
    };

    return field === props.field ? (
      direction === "asc" ? (
        <BsSortUp role="button" onClick={() => sortByField(props.field)} />
      ) : (
        <BsSortDown role="button" onClick={() => sortByField(props.field)} />
      )
    ) : (
      <BsArrowDownUp role="button" onClick={() => sortByField(props.field)} />
    );
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
          </div>
          <div className="col-12 col-sm-5 d-flex justify-content-end">
            <div className="search-bar input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Search here!"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            {loading ? (
              <Loading />
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">
                        <div className="d-flex align-items-center gap-2">
                          <span>#</span>
                          <SortButton field="id" />
                        </div>
                      </th>
                      <th scope="col">
                        <div className="d-flex align-items-center gap-2">
                          <span>Name</span>
                          <SortButton field="name" />
                        </div>
                      </th>
                      <th scope="col">
                        <div className="d-flex align-items-center gap-2">
                          <span>Brand</span>
                          <SortButton field="brand" />
                        </div>
                      </th>
                      <th scope="col">
                        <div className="d-flex align-items-center gap-2">
                          <span>Category</span>
                          <SortButton field="category" />
                        </div>
                      </th>
                      <th scope="col">
                        <div className="d-flex align-items-center gap-2">
                          <span>Created at</span>
                          <SortButton field="creationDate" />
                        </div>
                      </th>
                      <th scope="col">
                        <div className="d-flex align-items-center gap-2">
                          <span>Price</span>
                          <SortButton field="price" />
                        </div>
                      </th>
                      <th scope="col">
                        <span>Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products &&
                      products.map((product) => (
                        <tr key={product.id}>
                          <th scope="row">{product.id}</th>
                          <td>{product.name}</td>
                          <td>{product.brand}</td>
                          <td>{formatCategory(product.category)}</td>
                          <td>{product.creationDate}</td>
                          <td>
                            {new Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(product.price)}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-success"
                                onClick={() => {
                                  navigate(`/products/${product.id}`);
                                }}
                              >
                                <BsEyeFill />
                              </motion.button>

                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary"
                                onClick={() =>
                                  navigate(`/update/${product.id}`)
                                }
                              >
                                <BsPencilSquare />
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
                                <BsFillTrashFill />
                              </motion.button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
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
            <button
              className="btn btn-danger"
              onClick={() => handleDelete()}
              disabled={blockSubmit}
            >
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
    </div>
  );
};

export default Home;
