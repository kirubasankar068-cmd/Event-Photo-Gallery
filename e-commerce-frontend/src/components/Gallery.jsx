// src/components/Gallery.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendBaseUrl = "http://localhost:3001/api"; // change if needed

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`${backendBaseUrl}/images`);
        setImages(res.data);
      } catch (err) {
        console.error("Error fetching images", err);
      } finally {
        setLoading(false);
      }
    };
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02052a] text-slate-100">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#02052a] px-4 py-10">
      {/* left back window */}
      <div className="hidden md:block absolute -left-10 md:left-10 scale-90 -rotate-3 opacity-50">
        <WindowFrame variant="outline" />
      </div>

      {/* right back window */}
      <div className="hidden md:block absolute right-0 md:right-10 scale-90 rotate-3 opacity-40">
        <WindowFrame variant="wire" />
      </div>

      {/* main front window */}
      <div className="relative z-10 w-full max-w-4xl rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-[0_25px_80px_rgba(0,0,0,0.65)] border border-slate-200 px-8 py-6">
        <WindowTopBar title="Event Photo Gallery" />

        <div className="mt-6 grid gap-8 md:grid-cols-[220px,1fr] items-start">
          {/* left controls, imitating shapes */}
          <div className="space-y-5">
            <div className="bg-slate-200 rounded-full h-10 w-full flex items-center justify-between px-5">
              <span className="h-2 w-16 rounded-full bg-slate-400" />
              <span className="h-2 w-10 rounded-full bg-slate-300" />
            </div>

            <div className="bg-slate-200 rounded-full h-10 w-11/12 flex items-center justify-start px-5">
              <span className="h-2 w-24 rounded-full bg-slate-400" />
            </div>

            <button className="inline-flex items-center justify-center rounded-full bg-[#1755ff] text-white text-sm font-medium px-6 py-2 shadow-md hover:shadow-lg transition">
              Upload new photo
            </button>
          </div>

          {/* right: gallery grid inside the window */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((img) => (
              <article
                key={img._id || img.id}
                className="group overflow-hidden rounded-2xl bg-slate-200/70 border border-slate-300"
              >
                <div className="relative pt-[72%] overflow-hidden">
                  <img
                    src={img.imageUrl || img.image}
                    alt={img.title || img.name || "Event photo"}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="px-3 py-2">
                  <h3 className="text-xs font-semibold text-slate-800 truncate">
                    {img.title || img.name}
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-500 line-clamp-2">
                    {img.description}
                  </p>
                </div>
              </article>
            ))}

            {images.length === 0 && (
              <div className="col-span-full text-center text-xs text-slate-500">
                No images uploaded yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable tiny components for the window chrome */

function WindowTopBar({ title }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-amber-300" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <span className="ml-3 text-xs font-medium text-slate-600">
          {title}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-6 w-10 rounded-full border border-slate-300" />
        <div className="h-6 w-10 rounded-full border border-slate-300" />
      </div>
    </div>
  );
}

function WindowFrame({ variant }) {
  // simple decorative windows in the back
  return (
    <div className="w-[360px] rounded-3xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 px-6 py-4 shadow-[0_18px_60px_rgba(0,0,0,0.4)]">
      <WindowTopBar title="The creative" />
      <div className="mt-6 h-40 flex items-center justify-center">
        {variant === "outline" && (
          <div className="h-24 w-32 border-4 border-[#1755ff] rounded-3xl" />
        )}
        {variant === "wire" && (
          <div className="h-24 w-32 border-2 border-[#58c4b8] rounded-[40px]" />
        )}
      </div>
    </div>
  );
}
