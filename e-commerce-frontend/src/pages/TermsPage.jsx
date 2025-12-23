export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
        <div className="bg-white rounded-lg shadow-md p-8 prose prose-lg">
          <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
          <p className="mb-6">By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.</p>
          
          <h2 className="text-2xl font-semibold mb-4">Use License</h2>
          <p className="mb-6">Permission is granted to temporarily download one copy of the materials on Event Gallery's website for personal, non-commercial transitory viewing only.</p>
          
          <h2 className="text-2xl font-semibold mb-4">Disclaimer</h2>
          <p className="mb-6">The materials on Event Gallery's website are provided on an 'as is' basis. Event Gallery makes no warranties, expressed or implied.</p>
          
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p>For questions about these Terms of Service, please contact us at terms@eventgallery.com</p>
        </div>
      </div>
    </div>
  );
}