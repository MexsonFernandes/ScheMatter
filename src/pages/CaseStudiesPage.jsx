import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Clock,
  Target,
  Award,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import images
import printing1 from '../assets/images/3d_printing_1.jpg';
import printing2 from '../assets/images/3d_printing_2.jpg';
import cad1 from '../assets/images/cad_design_1.jpg';
import cad2 from '../assets/images/cad_design_2.jpg';
import collaborationIcon from '../assets/images/collaboration_icon.png';

function CaseStudiesPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <Badge className="mb-6 bg-green-100/80 text-green-700 hover:bg-green-200/80 backdrop-blur-sm border border-green-200/50 shadow-lg">
              Client Success Stories
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Case <span className="text-green-600">Studies</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Discover how we've helped clients across various industries bring their innovative ideas to life through precision 3D printing and CAD design services.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto">
              <div className="text-center p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600">Industries Served</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Client Satisfaction</div>
              </div>
              <div className="text-center p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                <div className="text-2xl font-bold text-green-600">6</div>
                <div className="text-sm text-gray-600">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Study */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Case Study</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our most impactful project that showcases our expertise and innovation
            </p>
          </div>

          <Card className="border border-white/30 bg-white/70 backdrop-blur-md shadow-2xl max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="relative">
                <img src={printing2} alt="Medical Device" className="w-full h-full object-cover lg:rounded-l-lg" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-700/90 text-white backdrop-blur-sm">Medical Device</Badge>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 text-white">
                    <div className="text-sm font-medium">Project Duration</div>
                    <div className="text-2xl font-bold">3 Months</div>
                  </div>
                </div>
              </div>
              <div className="p-8 lg:p-12">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-gray-800 mb-4">Revolutionary Surgical Instrument</h3>
                  <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                    Collaborated with MedTech Innovations to develop biocompatible prototypes for a minimally invasive surgical instrument that would revolutionize cardiac procedures.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                      <Target className="w-5 h-5 text-green-600 mr-3" />
                      The Challenge
                    </h4>
                    <p className="text-gray-600 ml-8 leading-relaxed">
                      MedTech Innovations needed functional prototypes of a complex surgical tool with intricate internal geometries, biocompatible materials, and the ability to withstand sterilization processes. Traditional manufacturing methods were too expensive and time-consuming for the iterative design process.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                      <Zap className="w-5 h-5 text-green-600 mr-3" />
                      Our Solution
                    </h4>
                    <div className="ml-8 space-y-3">
                      <p className="text-gray-600 leading-relaxed">
                        We implemented a comprehensive prototyping strategy using advanced DLP 3D printing technology with USP Class VI biocompatible resins.
                      </p>
                      <ul className="text-gray-600 space-y-2">
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          Multi-material printing for different component properties
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          Iterative design optimization through rapid prototyping
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          Sterilization testing and validation protocols
                        </li>
                        <li className="flex items-start">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-1 flex-shrink-0" />
                          FDA-compliant documentation and traceability
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-lg">
                      <Award className="w-5 h-5 text-green-600 mr-3" />
                      Results & Impact
                    </h4>
                    <p className="text-gray-600 ml-8 leading-relaxed mb-4">
                      The project exceeded all expectations, enabling our client to secure significant funding and accelerate their path to market.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 ml-8">
                      <div className="text-center p-3 bg-green-50/80 rounded-lg border border-green-200/50">
                        <div className="text-xl font-bold text-green-600">15</div>
                        <div className="text-xs text-gray-600">Prototypes</div>
                      </div>
                      <div className="text-center p-3 bg-green-50/80 rounded-lg border border-green-200/50">
                        <div className="text-xl font-bold text-green-600">$2M</div>
                        <div className="text-xs text-gray-600">Funding</div>
                      </div>
                      <div className="text-center p-3 bg-green-50/80 rounded-lg border border-green-200/50">
                        <div className="text-xl font-bold text-green-600">60%</div>
                        <div className="text-xs text-gray-600">Time Saved</div>
                      </div>
                      <div className="text-center p-3 bg-green-50/80 rounded-lg border border-green-200/50">
                        <div className="text-xl font-bold text-green-600">FDA</div>
                        <div className="text-xs text-gray-600">Approved</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">More Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our diverse portfolio of successful projects across multiple industries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Case Study 1 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md overflow-hidden">
              <div className="relative">
                <img src={printing1} alt="Automotive Prototype" className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-green-600/90 text-white backdrop-blur-sm">Automotive</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    <Clock className="w-3 h-3 inline mr-1" />
                    48 Hours
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Engine Component Rapid Prototyping</CardTitle>
                <CardDescription className="text-gray-600">
                  High-precision prototyping for automotive manufacturer's new engine design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Project Highlights</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                        Complex internal cooling channels
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                        High-temperature resistant materials
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                        ±0.1mm dimensional accuracy
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">±0.1mm</div>
                        <div className="text-xs text-gray-500">Precision</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">5</div>
                        <div className="text-xs text-gray-500">Iterations</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                      Read Full Story
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 2 */}
            <Card className="group hover:shadow-2xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md overflow-hidden">
              <div className="relative">
                <img src={cad1} alt="Architectural Model" className="w-full h-64 object-cover" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gray-700/90 text-white backdrop-blur-sm">Architecture</Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-1 text-white text-sm">
                    <Users className="w-3 h-3 inline mr-1" />
                    Team Project
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">Luxury Resort Scale Models</CardTitle>
                <CardDescription className="text-gray-600">
                  Detailed architectural models for high-end resort development presentation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Project Highlights</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                        Multi-building complex modeling
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                        Landscape and terrain features
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                        Removable sections for interior views
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">1:200</div>
                        <div className="text-xs text-gray-500">Scale</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">5</div>
                        <div className="text-xs text-gray-500">Buildings</div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50">
                      Read Full Story
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Case Studies */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {/* Case Study 3 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md overflow-hidden">
              <div className="relative">
                <img src={cad2} alt="Aerospace Component" className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-blue-600/90 text-white backdrop-blur-sm text-xs">Aerospace</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Aerospace Component Testing</CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Lightweight prototypes for drone propeller optimization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      Carbon fiber reinforced materials
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      Wind tunnel testing compatibility
                    </li>
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600">12</div>
                      <div className="text-xs text-gray-500">Designs</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 text-xs px-3 py-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 4 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md overflow-hidden">
              <div className="relative">
                <img src={collaborationIcon} alt="Educational Model" className="w-full h-48 object-contain bg-gray-100" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-purple-600/90 text-white backdrop-blur-sm text-xs">Education</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Educational Anatomy Models</CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Detailed anatomical models for medical school training
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      Multi-color anatomical accuracy
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      Removable organ components
                    </li>
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600">25</div>
                      <div className="text-xs text-gray-500">Models</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 text-xs px-3 py-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Case Study 5 */}
            <Card className="group hover:shadow-xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md overflow-hidden">
              <div className="relative">
                <img src={printing1} alt="Art Installation" className="w-full h-48 object-cover" />
                <div className="absolute top-3 left-3">
                  <Badge className="bg-pink-600/90 text-white backdrop-blur-sm text-xs">Art & Design</Badge>
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-gray-800">Contemporary Art Installation</CardTitle>
                <CardDescription className="text-gray-600 text-sm">
                  Large-scale sculptural elements for gallery exhibition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      Large format printing capabilities
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="w-3 h-3 text-green-600 mr-2" />
                      Custom texture and finish options
                    </li>
                  </ul>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm font-bold text-green-600">8</div>
                      <div className="text-xs text-gray-500">Pieces</div>
                    </div>
                    <Button variant="outline" size="sm" className="text-green-600 border-green-600 hover:bg-green-50 text-xs px-3 py-1">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              How we deliver exceptional results for every project
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Consultation</h3>
              <p className="text-gray-600 text-sm">
                Understanding your requirements and project goals through detailed discussion
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Design & Planning</h3>
              <p className="text-gray-600 text-sm">
                Creating detailed CAD models and selecting optimal materials and processes
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Production</h3>
              <p className="text-gray-600 text-sm">
                High-precision 3D printing with quality control at every stage
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600/90 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery</h3>
              <p className="text-gray-600 text-sm">
                Final inspection, packaging, and delivery with comprehensive documentation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative">
        <div className="absolute inset-0 bg-green-600/10 backdrop-blur-sm"></div>
        <div className="container mx-auto relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Join our growing list of satisfied clients and bring your innovative ideas to life with our expert 3D printing and CAD services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/#contact">
                <Button size="lg" className="bg-green-600/90 hover:bg-green-700/90 text-white text-lg px-8 py-3 backdrop-blur-sm shadow-lg">
                  Start Your Project
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-gray-300/50 hover:bg-white/50 text-gray-700 backdrop-blur-sm shadow-lg bg-white/30">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CaseStudiesPage;
