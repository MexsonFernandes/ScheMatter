import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Phone, Mail, MapPin, Send, CheckCircle, Clock } from 'lucide-react';

function ContactSection() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Import supabase dynamically or assume it's available if I import it at top
            const { error } = await supabase
                .from('landing_contact_submissions')
                .insert([{
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    email: formData.email,
                    phone: formData.phone,
                    message: formData.message
                }]);

            if (error) throw error;

            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="contact" className="py-24 px-4 bg-gray-50">
            <div className="container mx-auto max-w-6xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid lg:grid-cols-2">

                        {/* Left Side: Contact Info */}
                        <div className="bg-slate-900 p-10 lg:p-12 text-white flex flex-col justify-between relative overflow-hidden">
                            {/* Background Pattern */}
                            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
                            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

                            <div className="relative z-10">
                                <h2 className="text-4xl font-bold mb-6">
                                    Get In <span className="text-green-400">Touch</span>
                                </h2>
                                <p className="text-gray-300 mb-12 leading-relaxed text-lg">
                                    We're here to help turn your vision into reality. Reach out to us directly or fill out the form.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-green-500/20 transition-colors">
                                            <Phone className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg mb-1">Phone</div>
                                            <a href="tel:08322976999" className="block text-gray-300 hover:text-white transition-colors">0832-2976999</a>
                                            <a href="tel:+919823406444" className="block text-gray-300 hover:text-white transition-colors">+91 9823406444</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-green-500/20 transition-colors">
                                            <Mail className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg mb-1">Email</div>
                                            <a href="mailto:info@schematter.in" className="block text-gray-300 hover:text-white transition-colors break-all">
                                                info@schematter.in
                                            </a>
                                        </div>
                                    </div>

                                    <div className="flex items-start space-x-4">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0 hover:bg-green-500/20 transition-colors">
                                            <MapPin className="w-6 h-6 text-green-400" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-lg mb-1">Location</div>
                                            <p className="text-gray-300">Mapusa, Goa, India</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                                <div className="flex items-center space-x-3 mb-4">
                                    <Clock className="w-5 h-5 text-green-400" />
                                    <span className="font-semibold text-lg">Business Hours</span>
                                </div>
                                <div className="space-y-2 text-gray-300">
                                    <div className="flex justify-between">
                                        <span>Mon - Fri:</span>
                                        <span>10:00 AM - 5:30 PM</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Saturday:</span>
                                        <span>10:00 AM - 1:30 PM</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Contact Form */}
                        <div className="bg-white p-10 lg:p-12">
                            <div className="h-full flex flex-col justify-center">
                                <div className="mb-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a message</h3>
                                    <p className="text-gray-500">We'll get back to you within 24 hours</p>
                                </div>

                                {isSubmitted ? (
                                    <div className="flex flex-col items-center justify-center py-12 animate-scale-in flex-grow">
                                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                                            <CheckCircle className="w-10 h-10 text-green-600" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                                        <p className="text-gray-600 text-center max-w-md">
                                            Thank you for contacting us. We'll get back to you soon.
                                        </p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    First Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={formData.firstName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Last Name *
                                                </label>
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={formData.lastName}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                    placeholder="Doe"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Phone
                                                </label>
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all"
                                                    placeholder="+91 98234 06444"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Message *
                                            </label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows="4"
                                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all resize-none"
                                                placeholder="Tell us about your project..."
                                            ></textarea>
                                        </div>

                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:via-green-700 hover:to-green-600 text-white py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl disabled:opacity-70"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                            {!isSubmitting && <Send className="ml-2 w-5 h-5" />}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContactSection;
