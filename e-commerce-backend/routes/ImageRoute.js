import express from "express";
import { getAllImages, createImage, getImageById, deleteImage, addComment, upload } from "../controller/ImageController.js";

const router = express.Router();

router.get("/images", getAllImages);
router.post("/images", createImage);
router.get("/images/:id", getImageById);
router.delete("/images/:id", deleteImage);
router.post("/images/:id/comments", addComment);

export default router;