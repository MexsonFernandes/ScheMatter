import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Cog } from 'lucide-react';

function Layout({ children }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white/70 backdrop-blur-md border-b border-white/20 sticky top-0 z-50 shadow-lg hidden">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                <Cog className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">Schematter</h1>
                <p className="text-sm text-gray-600">CAD & Printing</p>
              </div>
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              <Link 
                to="/#services" 
                className={`transition-colors ${
                  location.pathname === '/' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Services
              </Link>
              <Link 
                to="/case-studies" 
                className={`transition-colors ${
                  location.pathname === '/case-studies' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Case Studies
              </Link>
              <Link 
                to="/#about" 
                className={`transition-colors ${
                  location.pathname === '/' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                About
              </Link>
              <Link 
                to="/#contact" 
                className={`transition-colors ${
                  location.pathname === '/' ? 'text-green-600' : 'text-gray-600 hover:text-green-600'
                }`}
              >
                Contact
              </Link>
              <Button className="bg-green-600/90 hover:bg-green-700/90 text-white backdrop-blur-sm shadow-lg">
                Get Started
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="relative py-12 px-4 hidden">
        <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-md"></div>
        <div className="container mx-auto relative z-10 text-white">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                  <Cog className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Schematter</h3>
                  <p className="text-sm text-gray-400">CAD & Printing</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Precision 3D printing and CAD services for innovative projects.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>3D Printing</li>
                <li>CAD Design</li>
                <li>Prototyping</li>
                <li>Collaboration Platform</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Industries</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Engineering</li>
                <li>Architecture</li>
                <li>Research</li>
                <li>Art & Entertainment</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>+91 9422680001</li>
                <li>Mapusa, Goa</li>
                <li>www.schematter.in</li>
              </ul>
            </div>
          </div>
          
          <Separator className="my-8 bg-white/20" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2024 Schematter CAD & Printing. All rights reserved.</p>
            <p>Goa DoIT Recognised Startup</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
