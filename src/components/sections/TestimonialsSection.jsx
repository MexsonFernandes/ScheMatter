import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Card, CardContent } from '../ui/card';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

function TestimonialsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTestimonials = async () => {
        try {
            const { data, error } = await supabase
                .from('landing_testimonials')
                .select('*')
                .eq('is_published', true)
                .order('display_order', { ascending: true });

            if (error) throw error;

            // Transform data to match component structure
            const formattedData = (data || []).map(item => ({
                id: item.id,
                name: item.client_name,
                role: item.role,
                company: item.company,
                rating: item.rating,
                text: item.content,
                avatar: item.image_url,
                initials: item.client_name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
            }));

            // Use Supabase data if available, otherwise fallback to empty array (or keep existing placeholder logic if desired, but user asked to load from API)
            // Ideally we show nothing or a specific empty state if 0 items.
            setTestimonials(formattedData);
        } catch (err) {
            console.error('Error fetching testimonials:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const nextTestimonial = () => {
        if (testimonials.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }
    };

    const prevTestimonial = () => {
        if (testimonials.length > 0) {
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        }
    };

    // Auto-play
    useEffect(() => {
        if (testimonials.length === 0) return;
        const interval = setInterval(nextTestimonial, 6000);
        return () => clearInterval(interval);
    }, [testimonials.length]);

    return (
        <section className="py-24 px-4 bg-gradient-to-br from-green-950 via-emerald-950 to-teal-950 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-[128px]"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-[128px]"></div>
            </div>

            <div className="container mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Client <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">Testimonials</span>
                    </h2>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        Trusted by industry leaders for precision and innovation
                    </p>
                </div>

                {/* Testimonial Carousel */}
                <div className="max-w-5xl mx-auto">
                    <div className="relative">
                        {/* Navigation Buttons - Absolute positioned on desktop */}
                        <button
                            onClick={prevTestimonial}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 hidden md:flex w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full items-center justify-center transition-all duration-300 border border-white/10 hover:border-green-500/50 group"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
                        </button>

                        <button
                            onClick={nextTestimonial}
                            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 hidden md:flex w-12 h-12 bg-white/5 hover:bg-white/10 rounded-full items-center justify-center transition-all duration-300 border border-white/10 hover:border-green-500/50 group"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-400 group-hover:text-green-400" />
                        </button>

                        {/* Loading / Empty State */}
                        {loading ? (
                            <div className="text-center text-white py-20">Loading testimonials...</div>
                        ) : testimonials.length === 0 ? (
                            <div className="text-center text-gray-400 py-20">No testimonials yet.</div>
                        ) : (
                            <Card className="bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden">
                                <CardContent className="p-0">
                                    <div className="grid md:grid-cols-5">
                                        {/* Quote Side */}
                                        <div className="md:col-span-2 bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-8 md:p-10 flex flex-col justify-center items-center text-center border-r border-white/5">
                                            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mb-6 shadow-lg shadow-green-900/50 overflow-hidden">
                                                {testimonials[currentIndex].avatar ? (
                                                    <img
                                                        src={testimonials[currentIndex].avatar}
                                                        alt={testimonials[currentIndex].name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    testimonials[currentIndex].initials
                                                )}
                                            </div>
                                            <div className="text-white font-bold text-xl mb-1">
                                                {testimonials[currentIndex].name}
                                            </div>
                                            <div className="text-green-400 text-sm font-medium mb-1">
                                                {testimonials[currentIndex].role}
                                            </div>
                                            <div className="text-gray-400 text-sm">
                                                {testimonials[currentIndex].company}
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div className="md:col-span-3 p-8 md:p-12 flex flex-col justify-center relative">
                                            <Quote className="absolute top-8 left-8 w-12 h-12 text-green-500/20" />

                                            <div className="animate-fade-in relative z-10" key={currentIndex}>
                                                <div className="flex space-x-1 mb-6">
                                                    {[...Array(testimonials[currentIndex].rating || 5)].map((_, i) => (
                                                        <Star key={i} className="w-5 h-5 fill-green-500 text-green-500" />
                                                    ))}
                                                </div>

                                                <p className="text-xl text-gray-200 leading-relaxed italic font-light">
                                                    "{testimonials[currentIndex].text}"
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Mobile Navigation & Dots */}
                    <div className="flex flex-col items-center mt-8 space-y-6 md:hidden">
                        <div className="flex items-center space-x-6">
                            <button
                                onClick={prevTestimonial}
                                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"
                            >
                                <ChevronLeft className="w-6 h-6 text-white" />
                            </button>
                            <button
                                onClick={nextTestimonial}
                                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10"
                            >
                                <ChevronRight className="w-6 h-6 text-white" />
                            </button>
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    <div className="flex justify-center space-x-3 mt-8 md:mt-12">
                        {testimonials.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-green-500 w-8'
                                    : 'bg-white/20 w-2 hover:bg-white/40'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TestimonialsSection;
