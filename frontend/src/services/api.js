import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001",
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const getAds = () => API.get("/api/ads");
export const postAd = (data) => API.post("/api/ads", data);

// AUTH
export const signup = (data) => API.post("/api/auth/signup", data);
export const login = (data) => API.post("/api/auth/login", data);

export default API;
