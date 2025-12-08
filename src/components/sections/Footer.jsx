import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        company: [
            { label: 'About Us', href: '#about' },
            { label: 'Our Services', href: '#services' },
            { label: 'Portfolio', href: '#portfolio' },
            { label: 'Contact', href: '#contact' }
        ],
        services: [
            { label: '3D Printing', href: '#services' },
            { label: 'CAD Design', href: '#services' },
            { label: 'Prototyping', href: '#services' },
            { label: 'Collaboration', href: '#services' }
        ],
        support: [
            { label: 'FAQ', href: '#' },
            { label: 'Privacy Policy', href: '#' },
            { label: 'Terms of Service', href: '#' },
            { label: 'Support', href: '#contact' }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: '#', label: 'Facebook' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' }
    ];

    const scrollToSection = (href) => {
        if (href.startsWith('#')) {
            const element = document.getElementById(href.substring(1));
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
            <div className="container mx-auto px-4 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-700 via-green-600 to-green-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">S</span>
                            </div>
                            <span className="text-2xl font-bold">Schematter</span>
                        </div>
                        <p className="text-gray-300 mb-6 leading-relaxed">
                            Precision 3D printing and CAD services based in Goa, India. Serving clients worldwide with innovative solutions for engineering, architecture, and creative projects.
                        </p>

                        {/* Contact Info */}
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Mail className="w-5 h-5 text-green-400" />
                                <a href="mailto:carl.desouza@schematter.in" className="hover:text-cyan-400 transition-colors">
                                    carl.desouza@schematter.in
                                </a>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-300">
                                <Phone className="w-5 h-5 text-green-400" />
                                <a href="tel:+919823406444" className="hover:text-cyan-400 transition-colors">
                                    +91 9823406444
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
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
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
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
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
                                    <button
                                        onClick={() => scrollToSection(link.href)}
                                        className="text-gray-300 hover:text-cyan-400 transition-colors"
                                    >
                                        {link.label}
                                    </button>
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
