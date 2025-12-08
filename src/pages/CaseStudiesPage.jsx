import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { ArrowLeft, Calendar, Building2, ArrowRight } from 'lucide-react';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const fetchCaseStudies = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('landing_case_studies')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCaseStudies(data || []);
    } catch (error) {
      console.error('Error fetching case studies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique industries
  const industries = ['all', ...new Set(caseStudies.map(cs => cs.industry).filter(Boolean))];

  // Filter case studies by industry
  const filteredStudies = selectedIndustry === 'all'
    ? caseStudies
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      <Header />

      {/* Hero Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Back to Home */}
          <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>

          {/* Title */}
          <div className="text-center mb-12">
            <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 px-4 py-2">
              Client Success Stories
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Case <span className="gradient-text">Studies</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
              Explore our success stories and see how we've helped clients across various industries achieve their goals through innovative 3D printing and CAD solutions.
            </p>

            {/* Industry Filter */}
            {industries.length > 1 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {industries.map((industry) => (
                  <button
                    key={industry}
                    onClick={() => setSelectedIndustry(industry)}
                    className={`
                                            px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                                            ${selectedIndustry === industry
                        ? 'bg-gradient-to-r from-green-700 to-green-500 text-white shadow-lg scale-105'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-green-300'
                      }
                                        `}
                  >
                    {industry === 'all' ? 'All Industries' : industry}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-7xl">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-xl mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : filteredStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {selectedIndustry === 'all'
                  ? 'No case studies available yet. Check back soon!'
                  : `No case studies found for ${selectedIndustry}.`}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStudies.map((caseStudy, index) => (
                <Link key={caseStudy.id} to={`/case-study/${caseStudy.slug}`}>
                  <Card
                    className="group cursor-pointer overflow-hidden hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-green-400 animate-scale-in h-full flex flex-col"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Cover Image */}
                    {caseStudy.cover_image_url && (
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={caseStudy.cover_image_url}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Industry Badge */}
                      {caseStudy.industry && (
                        <Badge className="mb-3 bg-green-100 text-green-700 border-green-200 w-fit">
                          {caseStudy.industry}
                        </Badge>
                      )}

                      {/* Title */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                        {caseStudy.title}
                      </h3>

                      {/* Summary */}
                      {caseStudy.summary && (
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                          {caseStudy.summary}
                        </p>
                      )}

                      {/* Meta */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                        {caseStudy.client_name && (
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Building2 className="w-4 h-4" />
                            <span className="line-clamp-1">{caseStudy.client_name}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(caseStudy.created_at).getFullYear()}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our growing list of satisfied clients and bring your innovative ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default CaseStudiesPage;
