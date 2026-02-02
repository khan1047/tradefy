import axios from "axios";

const API = "http://127.0.0.1:8001";

export const signupUser = (data) =>
  axios.post(`${API}/auth/signup`, data);

export const loginUser = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);

  if (res.data.access_token) {
    localStorage.setItem("token", res.data.access_token);
  }

  return res.data;
};
