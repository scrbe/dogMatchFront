import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API}/api/dogs`,
  withCredentials: true,
});

export const getAllDogsService = () => api.get("/");
export const getOneDogService = (dogId) => {
  const data = api.get(`/${dogId}`);
  return data;
};
export const createDogService = (dogBody) => api.post("/", dogBody);
export const updateDogService = (dogId) => api.post("/:dogId", dogId);
export const deleteDogService = (dogId) => api.post("/:dogId", dogId);
export const addImageService = (image) => api.post("/upload", image);
