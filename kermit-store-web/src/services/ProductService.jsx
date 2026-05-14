import React from "react";
import axios from "axios";

const API_URL = `http://localhost:8080/products`;

export const getAllProducts = (params) => {
  return axios.get(API_URL, { params });
};

export const getProductById = (id) => {
  return axios.get(API_URL + "/" + id);
};

export const updateProduct = (id, formData) => {
  return axios.put(API_URL + "/" + id, formData);
};

export const createProduct = (formData) => {
  return axios.post(API_URL, formData);
};

export const deleteProduct = (id) => {
  return axios.delete(API_URL + "/" + id);
};
