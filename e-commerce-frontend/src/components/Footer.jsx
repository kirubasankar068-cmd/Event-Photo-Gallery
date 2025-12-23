import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Event Gallery</h3>
            <p className="text-slate-300 text-sm">
              Capturing and sharing memorable moments from your special events.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/events" className="text-slate-300 hover:text-white">Events</Link></li>
              <li><Link to="/about" className="text-slate-300 hover:text-white">About</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-slate-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <p className="text-slate-300 text-sm">
              Email: info@eventgallery.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center text-sm text-slate-400">
          © 2024 Event Photo Gallery. All rights reserved.
        </div>
      </div>
    </footer>
  );
}