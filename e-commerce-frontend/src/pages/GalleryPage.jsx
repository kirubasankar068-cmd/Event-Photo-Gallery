import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BACKEND_BASE_URL = "http://localhost:3001/api";

export default function GalleryPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
      <div className="min-h-screen flex items-center justify-center bg-slate-200/90 text-slate-600">
        Loading events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-200/90 flex flex-col px-4 py-10">
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-center">
          <div className="md:w-1/3 bg-slate-900/90 backdrop-blur text-white rounded-2xl p-6 md:mr-6 shadow-xl">
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
          {events.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-slate-600">No events found. Make sure the backend is running on port 3001.</p>
            </div>
          ) : (
            events.map((ev, index) => (
              <div
                key={ev._id || ev.id}
                className="group flex flex-col rounded-xl overflow-hidden bg-white/95 backdrop-blur shadow-md hover:shadow-xl transition-shadow border border-slate-200 relative cursor-pointer"
                onClick={() => setSelectedEvent(ev)}
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
                      {ev.description?.substring(0, 50)}...
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
            ))
          )}
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
            <img
              src={selectedEvent.image}
              alt={selectedEvent.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedEvent.name}</h3>
            <p className="text-gray-600 mb-3">{selectedEvent.description}</p>
            <div className="space-y-1 text-sm mb-4">
              <div className="flex justify-between">
                <span className="font-medium">Price:</span>
                <span className="text-green-600 font-bold">₹{selectedEvent.price || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Rating:</span>
                <span>⭐ {selectedEvent.rating || 0}</span>
              </div>
              {selectedEvent.date && (
                <div className="flex justify-between">
                  <span className="font-medium">Date:</span>
                  <span>{selectedEvent.date}</span>
                </div>
              )}
              {selectedEvent.time && (
                <div className="flex justify-between">
                  <span className="font-medium">Time:</span>
                  <span>{selectedEvent.time}</span>
                </div>
              )}
              {selectedEvent.place && (
                <div className="flex justify-between">
                  <span className="font-medium">Place:</span>
                  <span>{selectedEvent.place}</span>
                </div>
              )}
            </div>
            <div className="text-center">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}