import axiosClient from "./axiosClient";

export const getProducts = ({ search = "", page = 1, limit = 10 } = {}) =>
  axiosClient.get("/products/", {
    params: {
      search: search || undefined,
      page,
      limit,
    },
  });
