import axios from "axios";

const BASE_URL = "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getImages = async () => {
  try {
    const response = await api.get("/api/photos");
    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
};

export const createImage = async (data) => {
  try {
    const response = await api.post("/api/photos", data);
    return response.data;
  } catch (error) {
    console.error("Error creating image:", error);
    throw error;
  }
};