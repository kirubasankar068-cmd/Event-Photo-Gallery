export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-2xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Contact Us</h1>
        <div className="bg-white rounded-lg shadow-md p-8">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
              <input type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-3 py-2 border border-slate-300 rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
              <textarea rows="4" className="w-full px-3 py-2 border border-slate-300 rounded-md"></textarea>
            </div>
            <button type="submit" className="w-full bg-sky-600 text-white py-2 px-4 rounded-md hover:bg-sky-700">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}