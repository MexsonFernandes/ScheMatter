import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Printer, Cog, Users, CheckCircle, ArrowRight, Ship } from 'lucide-react';
import printing1 from '../../assets/images/3d_printing_1.jpg';
import cad1 from '../../assets/images/cad_design_1.jpg';
import collaborationIcon from '../../assets/images/ship.png';

function ServicesSection() {
    const services = [
        {
            icon: Printer,
            title: '3D Printing Service',
            description: 'High-resolution DLP and FDM 3D printing services with exceptional accuracy and repeatability',
            image: printing1,
            gradient: 'from-green-700 to-green-500',
            features: [
                'High Resolution End-use Parts',
                'Rapid Prototyping',
                'Multiple Material Options',
                'Industrial Grade Quality'
            ]
        },
        {
            icon: Cog,
            title: 'CAD Design Service',
            description: 'Professional 3D Computer Aided Design services for engineering and architectural projects',
            image: cad1,
            gradient: 'from-green-600 to-green-400',
            features: [
                'Technical Drawings',
                '3D Modeling',
                'Design Optimization',
                'Reverse Engineering'
            ]
        },
        {
            icon: Ship,
            title: 'Shipbuilding Visualization',
            description: 'Unique platform connecting technical and non-technical individuals for collaborative projects',
            image: collaborationIcon,
            gradient: 'from-green-500 to-emerald-400',
            features: [
                '3D representation of existing designs',
                'Rendering with realistic background',
                'Scaled Models',
                'Interactive 3D presentations'
            ]
        }
    ];

    return (
        <section id="services" className="py-24 px-4 bg-white">
            <div className="container mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Comprehensive solutions for all your 3D printing and CAD design needs
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card
                                key={index}
                                className="group pt-0 hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-200 overflow-hidden animate-slide-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Image */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                                    {/* Icon Badge */}
                                    <div className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                                        <Icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                <CardHeader className="pb-4">
                                    <CardTitle className="text-2xl text-gray-900 group-hover:text-green-600 transition-colors">
                                        {service.title}
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 text-base">
                                        {service.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent>
                                    <ul className="space-y-3">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start">
                                                <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Learn More Link */}
                                    <button className="mt-6 flex items-center text-green-600 font-semibold hover:text-green-700 transition-colors group/link">
                                        Learn More
                                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" />
                                    </button>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ServicesSection;
