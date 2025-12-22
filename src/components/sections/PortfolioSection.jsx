import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { X } from 'lucide-react';

function PortfolioSection() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [filter, setFilter] = useState('all');
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([{ id: 'all', label: 'All Projects' }]);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);

            let data;

            // In production, try to load cached data
            if (import.meta.env.PROD) {
                try {
                    const cachedModule = await import('../../data/portfolio-cache.json');
                    data = cachedModule.default || cachedModule;
                    console.log('Using cached portfolio data');
                } catch (cacheError) {
                    console.warn('Cache not found, fetching from API');
                    // Fall through to API fetch
                }
            }

            // If no cached data (dev mode or cache missing), fetch from API
            if (!data) {
                const { data: apiData, error } = await supabase
                    .from('landing_portfolio_items')
                    .select('*')
                    .eq('is_published', true)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                data = apiData;
            }

            setProjects(data || []);

            // Extract unique tags for filtering
            const allTags = new Set();
            data?.forEach(project => {
                project.tags?.forEach(tag => allTags.add(tag));
            });

            const tagCategories = Array.from(allTags).map(tag => ({
                id: tag.toLowerCase(),
                label: tag
            }));

            setCategories([{ id: 'all', label: 'All Projects' }, ...tagCategories]);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.tags?.some(tag => tag.toLowerCase() === filter));

    if (loading) {
        return (
            <section id="portfolio" className="py-24 px-4 bg-gradient-to-br from-slate-50 to-purple-50">
                <div className="container mx-auto text-center">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
                        <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-8"></div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="portfolio" className="py-24 px-4 bg-gradient-to-br from-slate-50 to-purple-50">
            <div className="container mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="text-center mb-12 animate-fade-in">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Our <span className="gradient-text">Portfolio</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
                        Showcasing our expertise across diverse industries and applications
                    </p>

                    {/* Filter Badges */}
                    <div className="flex flex-wrap justify-center gap-3">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`
                                    px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                                    ${filter === cat.id
                                        ? 'bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg scale-105'
                                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300'
                                    }
                                `}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Portfolio Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-12 text-gray-500">
                        No portfolio items yet. Add some from the admin panel!
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {filteredProjects.map((project, index) => (
                            <Card
                                key={project.id}
                                className="group pt-0 overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-400 cursor-pointer animate-scale-in"
                                style={{ animationDelay: `${index * 0.1}s` }}
                                onClick={() => setSelectedImage(project)}
                            >
                                {/* Image Container - Full width, proper aspect ratio */}
                                <div className="relative h-64 overflow-hidden bg-gray-100">
                                    <img
                                        src={project.cover_image_url}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>

                                {/* Content - Always visible */}
                                <div className="p-4 bg-white">
                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {project.tags?.slice(0, 3).map((tag, i) => (
                                            <Badge key={i} className="bg-green-100 text-green-700 border-green-200">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                                        {project.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-gray-600 line-clamp-2">
                                        {project.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 animate-fade-in"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="max-w-5xl w-full">
                            <img
                                src={selectedImage.cover_image_url}
                                alt={selectedImage.title}
                                className="w-full h-auto rounded-lg shadow-2xl"
                            />
                            <div className="mt-6 text-center text-white">
                                <h3 className="text-3xl font-bold mb-2">{selectedImage.title}</h3>
                                <p className="text-lg text-gray-300 mb-4">{selectedImage.description}</p>
                                <div className="flex justify-center gap-4">
                                    {selectedImage.live_url && (
                                        <a
                                            href={selectedImage.live_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Live
                                        </a>
                                    )}
                                    {selectedImage.repo_url && (
                                        <a
                                            href={selectedImage.repo_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section >
    );
}

export default PortfolioSection;
