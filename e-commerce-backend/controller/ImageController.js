import Photo from "../model/Image.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });

export const getPhotos = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const getAllImages = async (req, res) => {
  try {
    const photos = await Photo.find().sort({ createdAt: -1 });
    res.json(photos);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const uploadPhoto = async (req, res) => {
  const { title, description } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided" });
  }

  try {
    const newPhoto = new Photo({
      title,
      description,
      image: `http://localhost:${process.env.PORT || 5001}/uploads/${req.file.filename}`
    });

    const saved = await newPhoto.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const createImage = async (req, res) => {
  const { name, price, rating, image, description, guests, date, time, place } = req.body;
  
  try {
    const newPhoto = new Photo({
      name,
      price: price || 0,
      rating: rating || 0,
      image,
      description,
      date,
      time,
      place,
      guests: guests || [],
      comments: []
    });

    const saved = await newPhoto.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const getImageById = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const photo = await Photo.findByIdAndDelete(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: "Image not found" });
    }
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};

export const addComment = async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ error: "Image not found" });
    }
    
    photo.comments.push(req.body);
    await photo.save();
    res.json(photo);
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
