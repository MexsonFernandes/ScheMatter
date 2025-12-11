import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import logo from '../../assets/images/schematter-logo.png';

function Footer() {
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const location = useLocation();

    const footerLinks = {
        company: [
            { label: 'About Us', href: '#about', type: 'scroll' },
            { label: 'Our Services', href: '#services', type: 'scroll' },
            { label: 'Portfolio', href: '#portfolio', type: 'scroll' },
            { label: 'Contact', href: '#contact', type: 'scroll' }
        ],
        services: [
            { label: '3D Printing', href: '#services', type: 'scroll' },
            { label: 'CAD Design', href: '#services', type: 'scroll' },
            { label: 'Prototyping', href: '#services', type: 'scroll' },
            { label: 'Collaboration', href: '#services', type: 'scroll' }
        ],
        support: [
            { label: 'Case Studies', href: '/case-studies', type: 'route' },
            { label: 'Privacy Policy', href: '/privacy-policy', type: 'route' },
            { label: 'Terms of Service', href: '/terms-of-service', type: 'route' },
            { label: 'Support', href: '#contact', type: 'scroll' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: 'https://www.facebook.com/schematter/', label: 'Facebook' },
        { icon: Twitter, href: 'https://twitter.com/schematter', label: 'Twitter' },
        { icon: Instagram, href: 'https://www.instagram.com/schematter_cad_3dp', label: 'Instagram' },
        { icon: Linkedin, href: 'https://www.linkedin.com/company/schematter/', label: 'LinkedIn' }
    ];

    // Handle scrolling to sections - works from any page
    const handleNavigateToSection = (href) => {
        if (href.startsWith('#')) {
            const sectionId = href.substring(1);

            // If we're on the homepage, just scroll
            if (location.pathname === '/') {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                // Navigate to homepage with hash, then scroll after navigation
                navigate(`/${href}`);
            }
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
        <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <img
                                src={logo}
                                alt="Schematter Logo"
                                className="h-12 w-auto"
                            />
                            <span className="text-2xl font-bold">Schematter</span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            ScheMatter CAD and Printing (OPC) Private Limited <br />
                            1st Floor, Office Nos. 5, 7, 9 & 11<br />
                            Braganza Trade Centre, Opp. Remanso Hospital<br />
                            Rajwaddo, Mapusa, Goa 403507
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Mail className="w-5 h-5 text-green-400" />
                                <a href="mailto:info@schematter.in" className="hover:text-cyan-400 transition-colors">
                                    info@schematter.in
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Phone className="w-5 h-5 text-green-400" />
                                <a href="tel:0832-2976999" className="hover:text-cyan-400 transition-colors">
                                    0832-2976999
                                </a>|&nbsp;
                                <a href="tel:+919823406444" className="hover:text-cyan-400 transition-colors">
                                    +91-9823406444
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <MapPin className="w-5 h-5 text-green-400" />
                                <span>Mapusa, Goa, India</span>
                            </div>
                        </div>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, index) => (
                                <li key={index}>
                                    {link.type === 'route' ? (
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleNavigateToSection(link.href)}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Services</h3>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    {link.type === 'route' ? (
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleNavigateToSection(link.href)}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link, index) => (
                                <li key={index}>
                                    {link.type === 'route' ? (
                                        <Link
                                            to={link.href}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleNavigateToSection(link.href)}
                                            className="text-gray-300 hover:text-cyan-400 transition-colors"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-700 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        {/* Copyright */}
                        <div className="text-gray-400 text-sm">
                            © {currentYear} Schematter CAD & Printing. All rights reserved.
                        </div>

                        {/* Social Links */}
                        <div className="flex space-x-4">
                            {socialLinks.map((social, index) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={index}
                                        href={social.href}
                                        aria-label={social.label}
                                        className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-green-700 hover:to-green-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
