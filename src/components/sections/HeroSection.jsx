import React from 'react';
import { Button } from '../ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

function HeroSection() {
    const scrollToContact = () => {
        const element = document.getElementById('contact');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToPortfolio = () => {
        const element = document.getElementById('portfolio');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const scrollToAbout = () => {
        const element = document.getElementById('about');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-green-400/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 py-32 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg mb-8 animate-fade-in">
                        <Sparkles className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-semibold bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent">
                            Serving India & Overseas
                        </span>
                    </div>

                    {/* Main Headline */}
                    <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight animate-slide-up">
                        Precision{' '}
                        <span className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 bg-clip-text text-transparent">
                            3D Printing
                        </span>
                        <br />& CAD Services
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        A unique collaboration platform for technical and non-technical individuals in Engineering, Architecture, Research, Art and Entertainment to develop 3D Printed and CAD models.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <Button
                            size="lg"
                            onClick={scrollToContact}
                            className="bg-gradient-to-r from-green-700 via-green-600 to-green-500 hover:from-green-800 hover:via-green-700 hover:to-green-600 text-white text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        >
                            Start Your Project
                            <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            onClick={scrollToPortfolio}
                            className="text-lg px-8 py-6 border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 transition-all duration-300"
                        >
                            View Portfolio
                        </Button>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-20 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">7+</div>
                            <div className="text-sm text-gray-600">Years Experience</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">500+</div>
                            <div className="text-sm text-gray-600">Projects Completed</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">100%</div>
                            <div className="text-sm text-gray-600">Client Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <button
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer z-20 hover:scale-110 transition-transform duration-300 bg-transparent border-none p-0"
                onClick={scrollToAbout}
                aria-label="Scroll to About section"
            >
                <div className="w-7 h-11 border-2 border-gray-400 rounded-full flex items-start justify-center pt-2 hover:border-green-500 transition-colors">
                    <div className="w-1.5 h-2.5 bg-gradient-to-b from-green-600 to-green-500 rounded-full animate-scroll"></div>
                </div>
            </button>
        </section>
    );
}

export default HeroSection;
