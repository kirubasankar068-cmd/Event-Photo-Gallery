export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">About Us</h1>
        <div className="prose prose-lg">
          <p className="text-slate-700 mb-6">
            Welcome to Event Photo Gallery, your premier destination for capturing and sharing memorable moments from events.
          </p>
          <p className="text-slate-700 mb-6">
            We specialize in creating beautiful photo galleries that preserve the essence of your special occasions.
          </p>
          <h2 className="text-2xl font-semibold text-slate-900 mb-4">Our Mission</h2>
          <p className="text-slate-700">
            To provide a seamless platform for event organizers and attendees to share and relive their precious memories.
          </p>
        </div>
      </div>
    </div>
  );
}