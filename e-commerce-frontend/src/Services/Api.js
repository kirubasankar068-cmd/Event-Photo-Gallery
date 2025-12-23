import axios from "axios";

const BASE_URL = "https://event-photo-gallery.onrender.com/api"; // change to your backend

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // if you use cookies
});

export const getPhotos = () => api.get("/api/photos");
export const uploadPhoto = (data) =>
  api.post("/api/photos", data, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export default api;
