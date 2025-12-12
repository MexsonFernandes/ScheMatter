import React from 'react';
import { Cog, Mail, PhoneCall } from 'lucide-react';

// Import new modular components
import Header from '../components/sections/Header';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import AboutSection from '../components/sections/AboutSection';
import CapabilitiesSection from '../components/sections/CapabilitiesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/sections/Footer';

function HomePage() {
  // Check if under construction mode is enabled
  const showUnderConstruction = import.meta.env.VITE_SHOW_UNDER_CONSTRUCTION === 'true';

  // If under construction, show only the banner
  if (showUnderConstruction) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50/80 p-4">
        {/* Centered "Under Construction" Section */}
        <section className="text-center max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50">
          <div className="flex justify-center mb-6">
            <Cog className="w-16 h-16 text-primary animate-spin-slow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Site Under Construction
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            We're busy building a new digital home for ScheMatter. In the meantime, you can reach out directly for all your 3D printing and CAD needs.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <div className="flex items-center space-x-2 text-primary font-semibold text-lg">
              <Mail className="w-6 h-6" />
              <a href="mailto:info@schematter.in" className="hover:underline">info@schematter.in</a>
            </div>
            <div className="flex items-center space-x-2 text-primary font-semibold text-lg">
              <PhoneCall className="w-6 h-6" />
              <a href="tel:0832-2976999" className="hover:underline">0832-2976999</a> or&nbsp;
              <a href="tel:919823406444" className="hover:underline">+91 9823406444</a>
            </div>
            <p className="text-sm text-gray-500">
              Click the email address above to get in touch.
            </p>
          </div>
        </section>
      </div>
    );
  }

  // Otherwise, show the full website with all new components
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <ServicesSection />
      <AboutSection />
      <CapabilitiesSection />
      <PortfolioSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

export default HomePage;
