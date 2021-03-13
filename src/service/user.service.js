import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api/user",
  withCredentials: true,
});

export const getUserService = (userId) => {
  const data = api.get(`/${userId}`);
  return data;
};

export const updateUserService = (userId) => api.post(`/${userId}`, userId);

export const addToFavoritesService = (dogId) => api.patch(`/${dogId}`, dogId);
