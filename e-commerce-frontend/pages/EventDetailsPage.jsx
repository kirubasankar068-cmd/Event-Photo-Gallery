import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_BASE_URL = "http://localhost:5001/api";

export default function EventDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/images/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Load event failed", err);
      }
    };
    load();
  }, [id]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 text-slate-600">
        Loading event...
      </div>
    );
  }

  const guests = event.guests || [];

  return (
    <div className="min-h-screen bg-slate-100 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="h-64 w-full object-cover"
        />
        <div className="px-6 py-4 space-y-3 text-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            {event.name}
          </h1>
          <p className="text-slate-700">{event.description}</p>
          <p className="text-xs text-slate-500">
            Date: {event.date || "—"} &nbsp; Time: {event.time || "—"}
          </p>
          <p className="text-xs text-slate-500">
            Place: {event.place || "—"}
          </p>
          <p className="text-xs text-slate-500">
            Guests:{" "}
            {Array.isArray(guests) && guests.length > 0
              ? guests.join(", ")
              : "—"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="mt-3 rounded-full bg-sky-500 text-white text-xs font-semibold px-4 py-2"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
