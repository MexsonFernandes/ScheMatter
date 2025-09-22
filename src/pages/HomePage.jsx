import React from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Phone,
  Mail,
  MapPin,
  Printer,
  Cog,
  Users,
  ArrowRight,
  CheckCircle,
  Star,
  Globe,
  Building,
  Calendar,
} from 'lucide-react';

// Import images
import printing1 from '../assets/images/3d_printing_1.jpg';
import printing2 from '../assets/images/3d_printing_2.jpg';
import cad1 from '../assets/images/cad_design_1.jpg';
import cad2 from '../assets/images/cad_design_2.jpg';
import collaborationIcon from '../assets/images/collaboration_icon.png';

function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/80 p-4">
      {/* Centered "Under Construction" Section */}
      <section className="text-center max-w-2xl mx-auto p-8 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50">
        <div className="flex justify-center mb-6">
          <Cog className="w-16 h-16 text-green-600 animate-spin-slow" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Site Under Construction
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          We're busy building a new digital home for Schematter. In the meantime, you can reach out directly for all your 3D printing and CAD needs.
        </p>
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-green-700 font-semibold text-lg">
            <Mail className="w-6 h-6" />
            <a href="mailto:carl.desouza@schematter.in" className="hover:underline">carl.desouza@schematter.in</a>
          </div>
          <p className="text-sm text-gray-500">
            Click the email address above to get in touch.
          </p>
        </div>
      </section>

      {/* The rest of the original page is hidden but included in the code */}
      <div className="hidden">
        {/* Hero Section */}
        <section className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          <div className="container mx-auto text-center relative z-10">
            <Badge className="mb-6 bg-green-100/80 text-green-700 hover:bg-green-200/80 backdrop-blur-sm border border-green-200/50 shadow-lg">
              Serving Goa, India & Overseas
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
              Precision <span className="text-green-600">3D Printing</span> & CAD Services
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A unique collaboration platform for technical and non-technical individuals in Engineering, Architecture, Research, Art and Entertainment to develop 3D Printed and CAD models.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600/90 hover:bg-green-700/90 text-white text-lg px-8 py-3 backdrop-blur-sm shadow-lg">
                Start Your Project
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-gray-300/50 hover:bg-white/50 text-gray-700 backdrop-blur-sm shadow-lg bg-white/30">
                View Portfolio
              </Button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gray-50/80 backdrop-blur-sm"></div>
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive solutions for all your 3D printing and CAD design needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 3D Printing Service */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-green-600/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Printer className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">3D Printing Service</CardTitle>
                  <CardDescription className="text-gray-600">
                    High-resolution DLP and FDM 3D printing services with exceptional accuracy and repeatability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={printing1} alt="3D Printing" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />High Resolution End-use Parts</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Rapid Prototyping</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Multiple Material Options</li>
                  </ul>
                </CardContent>
              </Card>

              {/* CAD Design Service */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gray-700/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Cog className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">CAD Design Service</CardTitle>
                  <CardDescription className="text-gray-600">
                    Professional 3D Computer Aided Design services for engineering and architectural projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={cad1} alt="CAD Design" className="w-full h-48 object-cover rounded-lg mb-4 shadow-md" />
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Technical Drawings</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />3D Modeling</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Design Optimization</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Collaboration Platform */}
              <Card className="group hover:shadow-2xl transition-all duration-300 border border-white/30 bg-white/70 backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-green-700/90 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">Collaboration Platform</CardTitle>
                  <CardDescription className="text-gray-600">
                    Unique platform connecting technical and non-technical individuals for collaborative projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <img src={collaborationIcon} alt="Collaboration" className="w-full h-48 object-contain rounded-lg mb-4 bg-gray-50/80 backdrop-blur-sm shadow-md" />
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Cross-disciplinary Teams</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Project Management</li>
                    <li className="flex items-center"><CheckCircle className="w-4 h-4 text-green-600 mr-2" />Real-time Collaboration</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          <div className="container mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <Badge className="mb-6 bg-green-100/80 text-green-700 hover:bg-green-200/80 backdrop-blur-sm border border-green-200/50 shadow-lg">
                  Since 2018
                </Badge>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">About Schematter</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Located in Mapusa, Goa, Schematter CAD & Printing is a recognized startup providing comprehensive 3D printing and CAD design services. We serve clients across various sectors including Manufacturing, Shipbuilding, Automotive, Engineering, Architecture, Research, Art, and Entertainment.
                </p>
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                    <Building className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">2-10</div>
                    <div className="text-sm text-gray-600">Employees</div>
                  </div>
                  <div className="text-center p-4 bg-white/70 backdrop-blur-md rounded-lg border border-white/30 shadow-lg">
                    <Calendar className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-800">2018</div>
                    <div className="text-sm text-gray-600">Founded</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['3D Printing', 'CAD Design', 'Prototyping', 'Additive Manufacturing', 'Engineering', 'Architecture'].map((specialty) => (
                    <Badge key={specialty} variant="secondary" className="bg-white/70 text-gray-700 border border-white/30 backdrop-blur-sm shadow-md">
                      {specialty}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <img src={printing2} alt="3D Printing Process" className="w-full h-64 object-cover rounded-lg shadow-lg" />
                <img src={cad2} alt="CAD Design" className="w-full h-64 object-cover rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 relative">
          <div className="absolute inset-0 bg-gray-800/90 backdrop-blur-md"></div>
          <div className="container mx-auto relative z-10 text-white">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Ready to bring your ideas to life? Contact us for a consultation
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-300">+91 9422680001</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Website</div>
                      <div className="text-gray-300">www.schematter.in</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-600/90 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-semibold">Location</div>
                      <div className="text-gray-300">Mapusa, Goa, India</div>
                    </div>
                  </div>
                </div>
              </div>

              <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white">Send us a message</CardTitle>
                  <CardDescription className="text-gray-300">
                    We'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      rows="4"
                      className="w-full px-3 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 shadow-lg"
                      placeholder="Tell us about your project..."
                    ></textarea>
                  </div>
                  <Button className="w-full bg-green-600/90 hover:bg-green-700/90 text-white backdrop-blur-sm shadow-lg">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;
