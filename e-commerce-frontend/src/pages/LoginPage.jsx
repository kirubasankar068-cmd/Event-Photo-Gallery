import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    if (formData.email === "admin@gallery.com" && formData.password === "admin123") {
      localStorage.setItem("isLoggedIn", "true");
      window.dispatchEvent(new Event('storage'));
      alert("Login successful!");
      navigate("/events");
    } else {
      alert("Invalid credentials. Use admin@gallery.com / admin123");
    }
    
    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-slate-100/90 flex items-center justify-center py-12">
      <div className="max-w-md w-full bg-white/95 backdrop-blur rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="admin@gallery.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="admin123"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm text-slate-600">
          Demo credentials: admin@gallery.com / admin123
        </div>
      </div>
    </div>
  );
}