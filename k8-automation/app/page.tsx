import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold">K8</div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-white font-medium">Home</a>
              <a href="/services" className="text-gray-300 hover:text-white transition-colors">Services</a>
              <a href="/success" className="text-gray-300 hover:text-white transition-colors">Success</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </nav>
            <button className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-black transition-colors">
              Login
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <div className="relative min-h-[calc(100vh-64px)] flex items-center">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-gray-900/95 to-gray-900/80 z-10"></div>
        
        {/* Background image simulation */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-blue-900/20 via-cyan-900/20 to-teal-900/20"></div>
        </div>

        {/* Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              Automate.<br />
              Orchestrate.<br />
              Scale.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
              Enterprise-grade workflow automation powered by n8n and AI.
            </p>

            <div className="flex gap-4 flex-wrap">
              <Link
                href="/services"
                className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all transform hover:scale-105"
              >
                View Services
              </Link>
              <Link
                href="/success"
                className="px-8 py-4 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all"
              >
                See Success Stories
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-2">K8</div>
            <p className="text-gray-400 mb-2">Automation Solutions Developer | n8n Specialist</p>
            <p className="text-sm text-gray-600">
              © 2028 K8 Automation Solutions. All rights reserved. | Developed with by K8
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
