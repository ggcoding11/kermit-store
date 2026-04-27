import React from "react";
import axios from "axios";

const urlProducts = `http://localhost:8080/products`;

export const getAllProducts = (params) => {
  return axios.get(urlProducts, { params });
};

export const getProductById = (id) => {
  return axios.get(urlProducts + "/" + id);
};

export const updateProduct = (id, product) => {
  return axios.put(urlProducts + "/" + id, product);
};

export const createProduct = (product) => {
  return axios.post(urlProducts, product);
};

export const deleteProduct = (id) => {};
