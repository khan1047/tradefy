import axiosClient from "./axiosClient";

export const sendMessage = (data) =>
  axiosClient.post("/messages/", data);

export const getInbox = () =>
  axiosClient.get("/messages/inbox");

export const getConversation = (productId) =>
  axiosClient.get(`/messages/conversation/${productId}`);
