import React from 'react';
import { Badge } from '../ui/badge';
import { Building, Calendar, Award, Target } from 'lucide-react';
import printing2 from '../../assets/images/3d_printing_2.jpg';
import cad2 from '../../assets/images/cad_design_2.jpg';

function AboutSection() {
    const stats = [
        { icon: Calendar, label: 'Founded', value: '2018' },
        { icon: Building, label: 'Team Size', value: '2-10' },
        { icon: Award, label: 'Industries Served', value: '8+' },
        { icon: Target, label: 'Success Rate', value: '100%' }
    ];

    const specialties = [
        '3D Printing',
        'CAD Design',
        'Prototyping',
        'Additive Manufacturing',
        'Engineering',
        'Architecture',
        'Research Support',
        'Art & Entertainment'
    ];

    return (
        <section id="about" className="py-24 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="animate-slide-up">
                        <Badge className="mb-6 bg-gradient-to-r from-green-700 to-green-500 text-white hover:from-green-800 hover:to-green-600 px-4 py-2 text-sm">
                            Since 2018
                        </Badge>

                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            About <span className="gradient-text">ScheMatter</span>
                        </h2>

                        <p className="text-lg text-gray-600 mb-6 leading-relaxed text-justify">
                            Located in <span className="font-semibold text-gray-800">Mapusa, Goa</span>, ScheMatter CAD & Printing is a recognized startup providing comprehensive 3D printing and CAD design services.
                        </p>

                        <p className="text-lg text-gray-600 mb-8 leading-relaxed text-justify">
                            We serve clients across various sectors including Manufacturing, Shipbuilding, Automotive, Engineering, Architecture, Research, Art, and Entertainment. Our mission is to bridge the gap between technical and non-technical individuals, enabling collaborative innovation.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <div
                                        key={index}
                                        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-green-300 transition-all duration-300 hover:shadow-lg"
                                    >
                                        <Icon className="w-8 h-8 text-green-600 mb-3" />
                                        <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                                        <div className="text-sm text-gray-600">{stat.label}</div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Specialties */}
                        <div className="flex flex-wrap gap-2">
                            {specialties.map((specialty, index) => (
                                <Badge
                                    key={index}
                                    variant="secondary"
                                    className="bg-white/80 text-gray-700 border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-300 px-3 py-1"
                                >
                                    {specialty}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Right Images */}
                    <div className="grid grid-cols-2 gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="space-y-4">
                            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={printing2}
                                    alt="3D Printing Process"
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                            <div className="bg-gradient-to-br from-green-700 via-green-600 to-green-500 rounded-2xl p-6 text-white shadow-xl">
                                <div className="text-3xl font-bold mb-2">500+</div>
                                <div className="text-sm opacity-90">Projects Delivered Successfully</div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="bg-gradient-to-br from-emerald-600 via-green-600 to-green-500 rounded-2xl p-6 text-white shadow-xl">
                                <div className="text-3xl font-bold mb-2">7+</div>
                                <div className="text-sm opacity-90">Years of Experience</div>
                            </div>
                            <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                                <img
                                    src={cad2}
                                    alt="CAD Design"
                                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutSection;
