import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UploadForm.css";

export default function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const backendBaseUrl = "http://localhost:5001/api"; // adjust

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Select an image file first.");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", file);

    try {
      setSubmitting(true);
      await axios.post(`${backendBaseUrl}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/gallery");
    } catch (err) {
      console.error("Error uploading image", err);
      alert("Upload failed. Check console for details.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-page">
      <form className="upload-form" onSubmit={handleSubmit}>
        <h1>Upload Event Photo</h1>

        <label>
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

        </label>

        <label className="file-label">
          Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />
        </label>

        <button type="submit" disabled={submitting}>
          {submitting ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
