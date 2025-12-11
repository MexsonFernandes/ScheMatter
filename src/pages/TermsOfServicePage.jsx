import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, Mail, Phone } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
            <Header />

            {/* Hero Section */}
            <section className="py-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    {/* Back to Home */}
                    <Link to="/" className="inline-flex items-center text-green-600 hover:text-green-700 mb-8 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Home
                    </Link>

                    {/* Title */}
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <FileText className="w-16 h-16 text-green-600" />
                        </div>
                        <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 px-4 py-2">
                            Legal Agreement
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Terms of <span className="gradient-text">Service</span>
                        </h1>
                        <p className="text-lg text-gray-600">
                            Last Updated: December 8, 2025
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="pb-24 px-4">
                <div className="container mx-auto max-w-4xl">
                    <Card className="p-8 md:p-12 bg-white/80 backdrop-blur-sm border-2 border-gray-100">
                        <div className="prose prose-lg max-w-none">
                            {/* Introduction */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms of Service ("Terms") constitute a legally binding agreement between you and Schematter CAD & Printing ("Schematter," "we," "us," or "our") regarding your use of our website <strong>schematter.in</strong> and our 3D printing and CAD design services.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    By accessing or using our services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our services.
                                </p>
                            </div>

                            {/* Services Description */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Services Provided</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Schematter provides the following services:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>3D Printing Services:</strong> Custom 3D printing using various materials and technologies (FDM, SLA, DLP, etc.)</li>
                                    <li><strong>CAD Design Services:</strong> Computer-aided design, modeling, and simulation</li>
                                    <li><strong>Prototyping:</strong> Rapid prototyping and iterative design development</li>
                                    <li><strong>Consultation:</strong> Technical consultation and project planning</li>
                                    <li><strong>Collaboration Platform:</strong> A workspace for technical and non-technical collaboration</li>
                                </ul>
                            </div>

                            {/* User Obligations */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Obligations</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    By using our services, you agree to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Provide accurate, current, and complete information when requesting services</li>
                                    <li>Maintain the confidentiality of any account credentials</li>
                                    <li>Use our services only for lawful purposes and in accordance with these Terms</li>
                                    <li>Not submit designs or files that infringe on intellectual property rights of others</li>
                                    <li>Not use our services to create illegal, dangerous, or offensive items</li>
                                    <li>Pay all fees and charges associated with your orders in a timely manner</li>
                                    <li>Comply with all applicable local, state, national, and international laws</li>
                                </ul>
                            </div>

                            {/* Prohibited Uses */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prohibited Uses</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    You may not use our services to:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Create weapons, firearm components, or items intended to cause harm</li>
                                    <li>Produce counterfeit goods or items that infringe on trademarks or copyrights</li>
                                    <li>Manufacture items that violate any laws or regulations</li>
                                    <li>Create obscene, offensive, or inappropriate content</li>
                                    <li>Reverse engineer our proprietary processes or technologies</li>
                                    <li>Engage in any activity that disrupts or interferes with our services</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    We reserve the right to refuse service for any project that violates these prohibitions or our ethical standards.
                                </p>
                            </div>

                            {/* Intellectual Property */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property Rights</h2>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Your Content</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    You retain all intellectual property rights to the designs, files, and content you provide to us ("Your Content"). By submitting Your Content, you grant us a limited, non-exclusive license to use, reproduce, and modify Your Content solely for the purpose of providing our services to you.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Our Content</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    All content on our website, including text, graphics, logos, images, and software, is the property of Schematter or its licensors and is protected by copyright, trademark, and other intellectual property laws.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Confidentiality</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We treat all client projects as confidential and will not share your designs or project details with third parties without your explicit consent, except as required by law or to fulfill our service obligations.
                                </p>
                            </div>

                            {/* Orders and Payments */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Orders, Pricing, and Payment</h2>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Quotations</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    All quotations are valid for 30 days from the date of issue unless otherwise specified. Prices are subject to change based on material costs, project complexity, and other factors.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Payment Terms</h3>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                    <li>Payment is required before production begins unless alternative arrangements are made</li>
                                    <li>We accept bank transfers, UPI, and other payment methods as specified</li>
                                    <li>For large projects, we may require a deposit before commencing work</li>
                                    <li>All prices are in Indian Rupees (INR) unless otherwise stated</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Cancellations and Refunds</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Orders may be cancelled before production begins for a full refund. Once production has started, cancellations may incur charges for materials used and work completed. Refunds are processed within 7-10 business days.
                                </p>
                            </div>

                            {/* Delivery and Shipping */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Delivery and Shipping</h2>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Delivery timelines are estimates and may vary based on project complexity and material availability</li>
                                    <li>Shipping costs are additional and will be communicated before order confirmation</li>
                                    <li>Risk of loss and title for items pass to you upon delivery to the carrier</li>
                                    <li>We are not responsible for delays caused by shipping carriers or customs</li>
                                    <li>Local pickup is available at our Mapusa, Goa location by appointment</li>
                                </ul>
                            </div>

                            {/* Quality and Warranties */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Quality Assurance and Warranties</h2>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">8.1 Quality Standards</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We strive to deliver high-quality products that meet industry standards. All items undergo quality inspection before delivery.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">8.2 Warranty</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We warrant that our services will be performed with reasonable care and skill. If you receive a defective product due to our error, we will reprint or repair it at no additional cost within 30 days of delivery.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">8.3 Limitations</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We are not responsible for defects arising from your design files, material limitations, or normal wear and tear. 3D printed items may have minor imperfections inherent to the manufacturing process.
                                </p>
                            </div>

                            {/* Limitation of Liability */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    To the maximum extent permitted by law:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Our total liability for any claim arising from our services shall not exceed the amount you paid for the specific service</li>
                                    <li>We are not liable for indirect, incidental, special, consequential, or punitive damages</li>
                                    <li>We are not responsible for delays, failures, or damages caused by events beyond our reasonable control</li>
                                    <li>You agree to indemnify us against claims arising from your use of our services or violation of these Terms</li>
                                </ul>
                            </div>

                            {/* Dispute Resolution */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Dispute Resolution</h2>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">10.1 Governing Law</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">10.2 Jurisdiction</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Any disputes arising from these Terms or our services shall be subject to the exclusive jurisdiction of the courts in Goa, India.
                                </p>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">10.3 Informal Resolution</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    Before initiating formal proceedings, we encourage you to contact us to seek an informal resolution of any dispute.
                                </p>
                            </div>

                            {/* Modifications */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications to Terms</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes are posted constitutes your acceptance of the modified Terms. We will notify you of material changes via email or website notice.
                                </p>
                            </div>

                            {/* Termination */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We may terminate or suspend your access to our services immediately, without prior notice, for any breach of these Terms or for any other reason at our sole discretion. Upon termination, your right to use our services will immediately cease.
                                </p>
                            </div>

                            {/* Severability */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Severability</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    If any provision of these Terms is found to be unenforceable or invalid, that provision will be limited or eliminated to the minimum extent necessary, and the remaining provisions will remain in full force and effect.
                                </p>
                            </div>

                            {/* Entire Agreement */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Entire Agreement</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    These Terms, together with our Privacy Policy, constitute the entire agreement between you and Schematter regarding the use of our services and supersede all prior agreements and understandings.
                                </p>
                            </div>

                            {/* Contact Information */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    If you have any questions about these Terms of Service, please contact us:
                                </p>
                                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                                    <p className="font-semibold text-gray-900 mb-3"> ScheMatter CAD and Printing (OPC) Pvt Ltd </p>
                                    <div className="space-y-2 text-gray-700">
                                        <p className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-green-600" />
                                            <a href="mailto:info@schematter.in" className="text-green-600 hover:underline">
                                                info@schematter.in
                                            </a>
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-green-600" />
                                            <span>0832-2976999 | +91 9823406444</span>
                                        </p>
                                        <p className="mt-3">
                                            <strong>Address:</strong> Mapusa, Goa, India
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Acknowledgment */}
                            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Acknowledgment</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    By using our services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree to these Terms, please do not use our services.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default TermsOfServicePage;
