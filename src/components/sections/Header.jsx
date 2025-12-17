import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/button';
import logo from '../../assets/images/schematter-logo.png';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Handle scrolling to sections - works from any page
    const handleNavigateToSection = (sectionId) => {
        setIsMobileMenuOpen(false);

        // If we're on the homepage, just scroll
        if (location.pathname === '/') {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        } else {
            // Navigate to homepage with hash, then scroll after navigation
            navigate(`/#${sectionId}`);
        }
    };

    // Scroll to section after navigation (for hash links)
    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.substring(1);
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location]);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/80 backdrop-blur-lg shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logo}
                            alt="ScheMatter Logo"
                            className="h-12 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <button
                            onClick={() => handleNavigateToSection('home')}
                            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                        >
                            Home
                        </button>
                        <button
                            onClick={() => handleNavigateToSection('services')}
                            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => handleNavigateToSection('about')}
                            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                        >
                            About
                        </button>
                        <button
                            onClick={() => handleNavigateToSection('portfolio')}
                            className="text-gray-700 hover:text-green-600 transition-colors font-medium"
                        >
                            Portfolio
                        </button>
                        <Link
                            to="/case-studies"
                            className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
                        >
                            Case Study
                        </Link>
                        <Button
                            onClick={() => handleNavigateToSection('contact')}
                            className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:via-green-700 hover:to-green-600 text-white"
                        >
                            Start Now
                        </Button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6 text-gray-700" />
                        ) : (
                            <Menu className="w-6 h-6 text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 animate-slide-up">
                        <nav className="flex flex-col space-y-4">
                            <button
                                onClick={() => handleNavigateToSection('home')}
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
                            >
                                Home
                            </button>
                            <button
                                onClick={() => handleNavigateToSection('services')}
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
                            >
                                Services
                            </button>
                            <button
                                onClick={() => handleNavigateToSection('about')}
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
                            >
                                About
                            </button>
                            <button
                                onClick={() => handleNavigateToSection('portfolio')}
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
                            >
                                Portfolio
                            </button>
                            <Link
                                to="/case-studies"
                                className="text-gray-700 hover:text-green-600 transition-colors font-medium text-left"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Case Study
                            </Link>
                            <Button
                                onClick={() => handleNavigateToSection('contact')}
                                className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:via-green-700 hover:to-green-600 text-white w-full"
                            >
                                Get Started
                            </Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
