import { Routes, Route, Navigate } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage.jsx";
import AddEventPage from "./pages/AddEventPage.jsx";
import EventDetailsPage from "./pages/EventDetailsPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import TermsPage from "./pages/TermsPage.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import VideoBackground from "./components/VideoBackground.jsx";

export default function App() {
  return (
    <div className="relative">
      <VideoBackground />
      <Header />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<GalleryPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-event" element={<AddEventPage />} />
          <Route path="/events/:id" element={<EventDetailsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
