export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>
        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-6">We collect information you provide directly to us, such as when you create an account or contact us.</p>
          
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="mb-6">We use the information we collect to provide, maintain, and improve our services.</p>
          
          <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
          <p className="mb-6">We do not sell, trade, or otherwise transfer your personal information to third parties.</p>
          
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@eventgallery.com</p>
        </div>
      </div>
    </div>
  );
}