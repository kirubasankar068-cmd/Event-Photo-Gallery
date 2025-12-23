import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };
    
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-slate-900/80 backdrop-blur text-white shadow relative z-20">
      <span className="text-lg font-semibold">Event Photo Gallery</span>
      <nav className="flex items-center gap-6 text-sm">
        <Link to="/events" className="hover:text-sky-400">Events</Link>
        <Link to="/add-event" className="hover:text-sky-400">Add Event</Link>
        <Link to="/about" className="hover:text-sky-400">About</Link>
        <Link to="/contact" className="hover:text-sky-400">Contact Us</Link>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-1.5 rounded-full bg-red-500 hover:bg-red-600 text-xs font-semibold"
          >
            Logout
          </button>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1.5 rounded-full bg-sky-500 hover:bg-sky-600 text-xs font-semibold"
          >
            Login
          </Link>
        )}
      </nav>
    </header>
  );
}
