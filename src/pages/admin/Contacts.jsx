
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { format } from 'date-fns';
import { CheckCircle, Mail, Phone, Trash2 } from 'lucide-react';

export default function Contacts() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from('landing_contact_submissions')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error(error);
        else setMessages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const updateStatus = async (id, status) => {
        // Optimistic update
        setMessages(messages.map(m => m.id === id ? { ...m, status } : m));

        await supabase
            .from('landing_contact_submissions')
            .update({ status })
            .eq('id', id);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        setMessages(messages.filter(m => m.id !== id));
        await supabase.from('landing_contact_submissions').delete().eq('id', id);
    };

    if (loading) return <div>Loading messages...</div>;

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>

            <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Message</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {messages.map((msg) => (
                            <TableRow key={msg.id}>
                                <TableCell className="whitespace-nowrap">
                                    {format(new Date(msg.created_at), 'MMM d, yyyy')}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {msg.first_name} {msg.last_name}
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col text-sm">
                                        <a href={`mailto:${msg.email}`} className="flex items-center text-blue-600 hover:underline">
                                            <Mail className="w-3 h-3 mr-1" /> {msg.email}
                                        </a>
                                        {msg.phone && (
                                            <span className="flex items-center text-gray-500 mt-1">
                                                <Phone className="w-3 h-3 mr-1" /> {msg.phone}
                                            </span>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="max-w-md truncate" title={msg.message}>
                                    {msg.message}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={msg.status === 'new' ? 'default' : msg.status === 'read' ? 'secondary' : 'outline'}>
                                        {msg.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    {msg.status === 'new' && (
                                        <Button size="icon" variant="ghost" onClick={() => updateStatus(msg.id, 'read')} title="Mark as Read">
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        </Button>
                                    )}
                                    <Button size="icon" variant="ghost" onClick={() => handleDelete(msg.id)} title="Delete">
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
