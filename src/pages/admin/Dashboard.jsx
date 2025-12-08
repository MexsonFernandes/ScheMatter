
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Users, FileText, Briefcase, MessageSquare } from 'lucide-react';

export default function Dashboard() {
    const [stats, setStats] = useState({
        messages: 0,
        testimonials: 0,
        portfolio: 0,
        caseStudies: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const [
                { count: messagesCount },
                { count: testimonialsCount },
                { count: portfolioCount },
                { count: caseStudiesCount }
            ] = await Promise.all([
                supabase.from('landing_contact_submissions').select('*', { count: 'exact', head: true }),
                supabase.from('landing_testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('landing_portfolio_items').select('*', { count: 'exact', head: true }),
                supabase.from('landing_case_studies').select('*', { count: 'exact', head: true })
            ]);

            setStats({
                messages: messagesCount || 0,
                testimonials: testimonialsCount || 0,
                portfolio: portfolioCount || 0,
                caseStudies: caseStudiesCount || 0
            });
        };

        fetchStats();
    }, []);

    const cards = [
        { title: 'New Messages', value: stats.messages, icon: MessageSquare, color: 'text-blue-500' },
        { title: 'Testimonials', value: stats.testimonials, icon: Users, color: 'text-green-500' },
        { title: 'Portfolio Items', value: stats.portfolio, icon: Briefcase, color: 'text-purple-500' },
        { title: 'Case Studies', value: stats.caseStudies, icon: FileText, color: 'text-orange-500' },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {cards.map((card) => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                            <CardTitle className="text-sm font-medium text-gray-500">
                                {card.title}
                            </CardTitle>
                            <card.icon className={`w-5 h-5 ${card.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
                <h2 className="text-xl font-bold mb-4">Welcome to Schematter Admin</h2>
                <p className="text-gray-600">Select a section from the sidebar to manage your content.</p>
            </div>
        </div>
    );
}
