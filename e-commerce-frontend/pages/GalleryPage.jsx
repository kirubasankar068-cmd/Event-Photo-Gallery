import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import VideoBackground from "../components/VideoBackground.jsx";


const BACKEND_BASE_URL = "http://localhost:5001/api";

export default function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    try {
      await axios.delete(`${BACKEND_BASE_URL}/images/${id}`);
      setEvents((prev) => prev.filter((e) => (e._id || e.id) !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete event");
    }
  };

  export default function GalleryPage() {
  // existing hooks, state, etc.

  return (
    <div className="min-h-screen relative">
      <VideoBackground />

      <div className="relative z-10">
        <Header />

        {/* your current blue “Event Booking” box and cards wrapper */}
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* KEEP your existing code here */}
        </div>

        <Footer />
      </div>
    </div>
  );
}


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/images`);
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-200 text-slate-600">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-6xl">
        <div className="mb-8 flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/3 bg-slate-900 text-white rounded-2xl p-6 md:mr-6 shadow-xl">
            <p className="text-xs font-semibold tracking-wide uppercase text-sky-400">
              Events
            </p>
            <h1 className="mt-3 text-2xl font-semibold">Event Booking</h1>
            <p className="mt-3 text-xs text-slate-300">
              Clean card layout for all your events. Click any event card to see details.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((ev) => (
            <div
              key={ev._id || ev.id}
              className="group flex flex-col rounded-xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow border border-slate-200 relative cursor-pointer"
              onClick={() => navigate(`/events/${ev._id || ev.id}`)}
            >
              <div className="relative pt-[62%] overflow-hidden">
                <img
                  src={ev.image}
                  alt={ev.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="px-4 py-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {ev.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {ev.description || "No description provided."}
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="font-semibold text-sky-600">
                    ₹{ev.price ?? 0}
                  </span>
                  <span className="text-slate-400">
                    ⭐ {typeof ev.rating === "number" ? ev.rating.toFixed(1) : ev.rating || 0}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(ev._id || ev.id);
                }}
                className="absolute top-2 right-2 rounded-full bg-red-500/90 text-white text-xs px-2 py-1 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <DetailsModal event={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function DetailsModal({ event, onClose }) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/55">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-3">
          <h2 className="text-sm font-semibold text-slate-900">{event.name}</h2>
          <button onClick={onClose} className="text-xs text-slate-500 hover:text-slate-900">
            Close
          </button>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2">
            <img src={event.image} alt={event.name} className="h-64 w-full object-cover" />
          </div>
          <div className="w-full md:w-1/2 px-5 py-4 space-y-3 text-sm">
            <p className="text-slate-700">{event.description || "No description provided."}</p>
            <p><span className="font-semibold">Price:</span> ₹{event.price ?? 0}</p>
            <p><span className="font-semibold">Rating:</span> {typeof event.rating === "number" ? event.rating.toFixed(1) : event.rating || "0"}</p>

            function Footer() 
   return (
    <footer className="mt-10 w-full px-8 py-4 bg-slate-900/90 text-[11px] text-slate-300">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© {new Date().getFullYear()} Event Photo Gallery.</span>
        <span>
          By using this site you agree to our event content, privacy, and booking policies.
        </span>
      </div>
    </footer>
  );

          </div>
        </div>
      </div>
    </div>
  );
}