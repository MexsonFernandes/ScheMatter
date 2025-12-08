import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield, Mail, Phone } from 'lucide-react';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import Header from '../components/sections/Header';
import Footer from '../components/sections/Footer';

function PrivacyPolicyPage() {
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
                            <Shield className="w-16 h-16 text-green-600" />
                        </div>
                        <Badge className="mb-6 bg-green-100 text-green-700 border-green-200 px-4 py-2">
                            Legal Information
                        </Badge>
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Privacy <span className="gradient-text">Policy</span>
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
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Schematter CAD & Printing ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <strong>schematter.in</strong> and use our services.
                                </p>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site or use our services.
                                </p>
                            </div>

                            {/* Information We Collect */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3">1.1 Personal Information</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We may collect personal information that you voluntarily provide to us when you:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                                    <li>Fill out contact forms on our website</li>
                                    <li>Request a quote or consultation</li>
                                    <li>Communicate with us via email or phone</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    This information may include:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Name (first and last)</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Project details and requirements</li>
                                    <li>Billing and shipping address (for orders)</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.2 Automatically Collected Information</h3>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    When you visit our website, we may automatically collect certain information about your device and browsing actions, including:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>IP address</li>
                                    <li>Browser type and version</li>
                                    <li>Operating system</li>
                                    <li>Pages visited and time spent on pages</li>
                                    <li>Referring website addresses</li>
                                    <li>Device information (mobile, desktop, tablet)</li>
                                </ul>

                                <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-6">1.3 Cookies and Tracking Technologies</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                                </p>
                            </div>

                            {/* How We Use Your Information */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We use the information we collect for the following purposes:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Service Delivery:</strong> To provide, operate, and maintain our 3D printing and CAD design services</li>
                                    <li><strong>Communication:</strong> To respond to your inquiries, provide customer support, and send project updates</li>
                                    <li><strong>Project Management:</strong> To understand your requirements and deliver customized solutions</li>
                                    <li><strong>Billing:</strong> To process payments and send invoices</li>
                                    <li><strong>Marketing:</strong> To send promotional materials, newsletters, and updates (with your consent)</li>
                                    <li><strong>Analytics:</strong> To analyze website usage and improve our services</li>
                                    <li><strong>Legal Compliance:</strong> To comply with legal obligations and protect our rights</li>
                                </ul>
                            </div>

                            {/* How We Share Your Information */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Share Your Information</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Service Providers:</strong> With trusted third-party vendors who assist us in operating our website, conducting our business, or servicing you (e.g., payment processors, hosting providers, email services)</li>
                                    <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
                                    <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                                    <li><strong>Protection:</strong> To protect our rights, property, or safety, or that of our users or others</li>
                                    <li><strong>With Your Consent:</strong> When you explicitly authorize us to share your information</li>
                                </ul>
                            </div>

                            {/* Data Security */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li>Secure Socket Layer (SSL) encryption for data transmission</li>
                                    <li>Secure database storage with access controls</li>
                                    <li>Regular security audits and updates</li>
                                    <li>Limited employee access to personal data</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
                                </p>
                            </div>

                            {/* Data Retention */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Retention</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When we no longer need your information, we will securely delete or anonymize it.
                                </p>
                            </div>

                            {/* Your Rights */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Privacy Rights</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    Depending on your location, you may have the following rights regarding your personal information:
                                </p>
                                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                                    <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                                    <li><strong>Objection:</strong> Object to the processing of your personal information</li>
                                    <li><strong>Restriction:</strong> Request restriction of processing your personal information</li>
                                    <li><strong>Portability:</strong> Request transfer of your data to another service provider</li>
                                    <li><strong>Withdraw Consent:</strong> Withdraw consent for marketing communications at any time</li>
                                </ul>
                                <p className="text-gray-700 leading-relaxed mt-4">
                                    To exercise these rights, please contact us using the information provided below.
                                </p>
                            </div>

                            {/* Third-Party Links */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-Party Links</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these external sites. We encourage you to review the privacy policies of any third-party sites you visit.
                                </p>
                            </div>

                            {/* Children's Privacy */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately, and we will take steps to delete such information.
                                </p>
                            </div>

                            {/* International Data Transfers */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Your information may be transferred to and maintained on servers located outside of your state, province, country, or other governmental jurisdiction where data protection laws may differ. By using our services, you consent to the transfer of your information to India and other countries where we operate.
                                </p>
                            </div>

                            {/* Changes to Privacy Policy */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Privacy Policy</h2>
                                <p className="text-gray-700 leading-relaxed">
                                    We may update this Privacy Policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. We encourage you to review this Privacy Policy periodically.
                                </p>
                            </div>

                            {/* Contact Information */}
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                                <p className="text-gray-700 leading-relaxed mb-4">
                                    If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
                                </p>
                                <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                                    <p className="font-semibold text-gray-900 mb-3"> ScheMatter CAD and Printing (OPC) Pvt Ltd </p>
                                    <div className="space-y-2 text-gray-700">
                                        <p className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-green-600" />
                                            <a href="mailto:carl.desouza@schematter.in" className="text-green-600 hover:underline">
                                                carl.desouza@schematter.in
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

                            {/* Consent */}
                            <div className="bg-gray-50 border border-gray-200 p-6 rounded-lg">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Consent</h3>
                                <p className="text-gray-700 leading-relaxed">
                                    By using our website and services, you consent to the collection, use, and sharing of your information as described in this Privacy Policy.
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

export default PrivacyPolicyPage;
