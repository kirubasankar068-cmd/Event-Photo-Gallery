import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const BACKEND_BASE_URL = "http://localhost:5001/api";

export default function EventDetailsPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/images/${id}`);
        setEvent(res.data);
        setComments(res.data.comments || []);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    
    try {
      const newComment = {
        text: comment,
        author: "Anonymous",
        timestamp: new Date().toISOString()
      };
      
      await axios.post(`${BACKEND_BASE_URL}/images/${id}/comments`, newComment);
      setComments([...comments, newComment]);
      setComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100/90">
        <div className="text-slate-600">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100/90">
        <div className="text-slate-600">Event not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/90 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/95 backdrop-blur rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={event.image}
                alt={event.name}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h1 className="text-3xl font-bold text-slate-900 mb-4">{event.name}</h1>
              <p className="text-slate-700 mb-6">{event.description}</p>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Price:</span>
                  <span className="text-sky-600 font-bold">₹{event.price || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Rating:</span>
                  <span className="text-slate-800">⭐ {event.rating || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Date:</span>
                  <span className="text-slate-800">{event.date || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Time:</span>
                  <span className="text-slate-800">{event.time || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-600">Place:</span>
                  <span className="text-slate-800">{event.place || "—"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-200 p-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">Comments</h2>
            
            <form onSubmit={handleCommentSubmit} className="mb-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-md"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
                >
                  Post
                </button>
              </div>
            </form>
            
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-semibold text-slate-900">{comment.author}</span>
                      <span className="text-xs text-slate-500">
                        {new Date(comment.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-slate-700">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-slate-500 text-center py-8">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}