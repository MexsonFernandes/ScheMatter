import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Building2, ExternalLink, Clock } from 'lucide-react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

function CaseStudyDetailPage() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [caseStudy, setCaseStudy] = useState(null);
    const [relatedStudies, setRelatedStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (slug) {
            fetchCaseStudy();
        }
    }, [slug]);

    const fetchCaseStudy = async () => {
        try {
            setLoading(true);

            // Fetch the specific case study
            const { data, error } = await supabase
                .from('landing_case_studies')
                .select('*')
                .eq('slug', slug)
                .eq('is_published', true)
                .single();

            if (error) throw error;
            setCaseStudy(data);

            // Fetch related case studies (same industry, excluding current)
            if (data) {
                const { data: related } = await supabase
                    .from('landing_case_studies')
                    .select('*')
                    .eq('is_published', true)
                    .neq('id', data.id)
                    .limit(3);

                setRelatedStudies(related || []);
            }
        } catch (error) {
            console.error('Error fetching case study:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
                <Header />
                <div className="py-24 px-4">
                    <div className="container mx-auto max-w-4xl">
                        <div className="animate-pulse space-y-8">
                            <div className="h-96 bg-gray-200 rounded-2xl"></div>
                            <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                            <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                            <div className="space-y-4">
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!caseStudy) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
                <Header />
                <div className="py-24 px-4">
                    <div className="container mx-auto max-w-4xl text-center">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">Case Study Not Found</h1>
                        <p className="text-gray-600 mb-8">The case study you're looking for doesn't exist or has been removed.</p>
                        <Link to="/case-studies">
                            <Button>
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Case Studies
                            </Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
            <Header />

            {/* Case Study Detail */}
            <article className="py-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Back Button */}
                    <Link to="/case-studies">
                        <Button
                            variant="ghost"
                            className="mb-8 hover:bg-green-50"
                        >
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Case Studies
                        </Button>
                    </Link>

                    {/* Cover Image */}
                    {caseStudy.cover_image_url && (
                        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
                            <img
                                src={caseStudy.cover_image_url}
                                alt={caseStudy.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    )}

                    {/* Title & Meta */}
                    <header className="mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            {caseStudy.title}
                        </h1>

                        <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                            {caseStudy.client_name && (
                                <div className="flex items-center gap-2">
                                    <Building2 className="w-4 h-4" />
                                    <span>{caseStudy.client_name}</span>
                                </div>
                            )}
                            {caseStudy.industry && (
                                <Badge className="bg-green-100 text-green-700 border-green-200">
                                    {caseStudy.industry}
                                </Badge>
                            )}
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>{new Date(caseStudy.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                            </div>
                        </div>

                        {caseStudy.summary && (
                            <p className="text-xl text-gray-600 leading-relaxed">
                                {caseStudy.summary}
                            </p>
                        )}
                    </header>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <div
                            className="text-gray-700 leading-relaxed whitespace-pre-wrap"
                            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
                        />
                    </div>

                    {/* CTA */}
                    <div className="mt-12 p-8 bg-gradient-to-r from-green-700 to-green-500 rounded-2xl text-white text-center">
                        <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
                        <p className="mb-6">Let's discuss how we can help bring your ideas to life.</p>
                        <Link to="/#contact">
                            <Button
                                size="lg"
                                className="bg-white text-green-700 hover:bg-gray-100"
                            >
                                Get in Touch
                                <ExternalLink className="w-4 h-4 ml-2" />
                            </Button>
                        </Link>
                    </div>

                    {/* Related Case Studies */}
                    {relatedStudies.length > 0 && (
                        <div className="mt-16">
                            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Case Studies</h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {relatedStudies.map((study) => (
                                    <Link key={study.id} to={`/case-study/${study.slug}`}>
                                        <Card className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-400">
                                            {study.cover_image_url && (
                                                <div className="relative h-48 overflow-hidden">
                                                    <img
                                                        src={study.cover_image_url}
                                                        alt={study.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                {study.industry && (
                                                    <Badge className="mb-2 bg-green-100 text-green-700 border-green-200 text-xs">
                                                        {study.industry}
                                                    </Badge>
                                                )}
                                                <h3 className="font-bold text-gray-900 group-hover:text-green-600 transition-colors line-clamp-2">
                                                    {study.title}
                                                </h3>
                                            </div>
                                        </Card>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>

            <Footer />
        </div>
    );
}

export default CaseStudyDetailPage;
