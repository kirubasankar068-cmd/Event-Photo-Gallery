// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Gallery from "./components/Gallery";
import UploadForm from "./components/UploadForm";

function Login() {
  const handleLogin = () => {
    // After successful auth from backend, store user info/token
    localStorage.setItem("user", JSON.stringify({ name: "demoUser" }));
    window.location.href = "/gallery";
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login as Demo</button>
    </div>
  );
}

function Home() {
  return <h2>Welcome to Event Photo Gallery</h2>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* protected routes */}
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <Gallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <UploadForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
