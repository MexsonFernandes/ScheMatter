import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent } from '../ui/card';
import { Layers, Zap, Palette, Boxes } from 'lucide-react';

function CapabilitiesSection() {
    const capabilities = [
        {
            id: 'materials',
            label: 'Materials',
            icon: Layers,
            content: {
                title: 'Wide Range of Materials',
                description: 'We work with various materials to suit your specific project requirements',
                items: [
                    { name: 'PLA', desc: 'Biodegradable, easy to print, ideal for prototypes, visual models & educational projects.' },
                    { name: 'ABS', desc: 'Strong, heat-resistant engineering plastic for functional parts, enclosures & mechanical components.' },
                    { name: 'PETG', desc: 'Durable, chemical-resistant, food-safe material suited for consumer products & industrial use.' },
                    { name: 'Resin', desc: 'High resolution functional rigid & flexible parts using OEM Resins from 3D Systems INC.' },
                    // { name: 'Nylon', desc: 'Flexible yet tough; great for gears, mechanical assemblies & engineering-grade output.' },
                    { name: 'TPU', desc: 'Rubber-like elasticity; ideal for wearable prototypes, cushioning elements & impact-resistant parts.' }
                ]
            }
        },
        {
            id: 'technologies',
            label: 'Technologies',
            icon: Zap,
            content: {
                title: 'Advanced 3D Printing Technologies',
                description: 'State-of-the-art equipment for precision manufacturing',
                items: [
                    { name: 'FDM 3D Printing', desc: 'Cost-effective, fast and reliable—perfect for end use components, prototypes, structural parts, jigs & fixtures.' },
                    { name: 'CAD Modelling & Simulation', desc: 'Professional 3D modelling, assembly design, surface modelling & design validation using advanced CAD tools.' },
                    { name: 'Product Development Support', desc: 'Iterative design, prototyping and optimisation for startups, researchers and hardware innovators.' },
                    { name: 'Collaborative 3D Development Platform', desc: 'A unique workspace where technical & non-technical clients can collaborate seamlessly with our design team.' },
                    { name: 'Resin Based Hi-Res 3D Printing', desc: 'High resolution rigid & flexible parts using 3D Systems Figure 4 DLP System.' }
                ]
            }
        },
        {
            id: 'applications',
            label: 'Applications',
            icon: Palette,
            content: {
                title: 'Industry Applications',
                description: 'Serving diverse industries with tailored solutions',
                items: [
                    { name: 'Engineering & Industrial Design', desc: 'Functional prototypes, machine parts, fixtures, housings, R&D components.' },
                    { name: 'Interior Design & Architecture', desc: 'CAD, rendering, prototyping and production of fixtures, furniture components & related items.' },
                    { name: 'Healthcare', desc: 'Anatomical models and surgical guides (non-clinical).' },
                    { name: 'Art, Sculptures & Creative Media', desc: 'Custom figurines, installation elements, character models for film & animations.' },
                    { name: 'Research & Academia', desc: 'Experimental components, lab fixtures, concept visualisation models.' },
                    { name: 'Consumer Products', desc: 'Customized items, wearables, home gadgets, replacement parts & personalised creations.' },
                    { name: 'Shipduilding', desc: 'A compact visual solution offering 3D models of ship designs, realistic rendered scenes, scaled models, and interactive 3D presentations.' }
                ]
            }
        },
        {
            id: 'specifications',
            label: 'Specifications',
            icon: Boxes,
            content: {
                title: 'Technical Specifications',
                description: 'Professional-grade capabilities for your projects',
                items: [
                    { name: 'Build Volume', desc: 'Large-format printing available for architectural & industrial-scale models.' },
                    { name: 'Material Strength Profiles', desc: 'Tensile, flexural & thermal properties supplied on request based on material selection.' },
                    { name: 'Accuracy', desc: '±0.1mm dimensional accuracy' },
                    { name: 'Design File Support', desc: 'STL, OBJ, STEP, IGES, Fusion files & custom engineering formats.s' },
                    { name: 'Quality Assurance', desc: 'Dimensional checks, test prints, structural validation & model optimisation included.' },
                ]
            }
        }
    ];

    return (
        <section id="capabilities" className="py-24 px-4 bg-white">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="gradient-text">Capabilities</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Advanced technologies and materials for every project requirement
                    </p>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="materials" className="w-full">
                    <div className="max-w-4xl mx-auto mb-12">
                        <TabsList className="w-full grid grid-cols-2 lg:grid-cols-4 gap-2 bg-white rounded-2xl shadow-lg border border-gray-200 p-1 h-auto">
                            {capabilities.map((cap) => {
                                const Icon = cap.icon;
                                return (
                                    <TabsTrigger
                                        key={cap.id}
                                        value={cap.id}
                                        className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 h-auto data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-700 data-[state=active]:to-green-500 data-[state=active]:text-white data-[state=inactive]:text-gray-600 data-[state=inactive]:hover:text-gray-900 data-[state=inactive]:hover:bg-gray-50"
                                    >
                                        <Icon className="w-4 h-4" />
                                        <span>{cap.label}</span>
                                    </TabsTrigger>
                                );
                            })}
                        </TabsList>
                    </div>

                    {capabilities.map((cap, index) => (
                        <TabsContent key={cap.id} value={cap.id} className="animate-fade-in">
                            <div className="mb-8">
                                <h3 className="text-3xl font-bold text-gray-900 mb-3">{cap.content.title}</h3>
                                <p className="text-lg text-gray-600">{cap.content.description}</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {cap.content.items.map((item, idx) => (
                                    <Card
                                        key={idx}
                                        className="group hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-blue-200 animate-scale-in"
                                        style={{ animationDelay: `${idx * 0.05}s` }}
                                    >
                                        <CardContent className="p-6">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-600 text-justify">{item.desc}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
        </section>
    );
}

export default CapabilitiesSection;
