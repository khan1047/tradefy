import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8001",
});

// PRODUCTS
export const getProducts = () => API.get("/products/all");
export const getProduct = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products/create", data);

// UPLOAD
export const uploadImage = (file) => {
  const form = new FormData();
  form.append("file", file);
  return API.post("/upload/", form);
};

// AUTH
export const signupUser = (data) => API.post("/auth/signup", data);
export const loginUser = (data) => API.post("/auth/login", data);
