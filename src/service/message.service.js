import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/messages`,
  withCredentials: true,
});

export const getMessagesService = () => api.get("/");

export const sendMessagesService = (dogId, messageBody) =>
  api.post(`/${dogId}/send`, messageBody);
