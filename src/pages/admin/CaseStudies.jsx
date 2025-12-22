import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Plus, Pencil, Trash2, FileText, Eye, Code } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CaseStudies() {
    const [items, setItems] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchItems = async () => {
        const { data } = await supabase.from('landing_case_studies').select('*').order('created_at', { ascending: false });
        setItems(data || []);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this case study?')) return;
        setItems(items.filter(i => i.id !== id));
        await supabase.from('landing_case_studies').delete().eq('id', id);
        toast.success('Case study deleted successfully');
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
                <Button onClick={() => { setEditingItem(null); setIsDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" /> New Case Study
                </Button>
            </div>

            <div className="grid gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row gap-6">
                        <div className="w-full md:w-48 h-32 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                            {item.cover_image_url ? (
                                <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <FileText className="w-8 h-8" />
                                </div>
                            )}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                        {item.client_name && <span>{item.client_name}</span>}
                                        {item.client_name && item.industry && <span>•</span>}
                                        {item.industry && <span>{item.industry}</span>}
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {item.is_published ? 'Published' : 'Draft'}
                                </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{item.summary}</p>

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => { setEditingItem(item); setIsDialogOpen(true); }}>
                                    <Pencil className="w-4 h-4 mr-2" /> Edit
                                </Button>
                                <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(item.id)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <CaseStudyForm
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
                initialData={editingItem}
                onSuccess={() => { setIsDialogOpen(false); fetchItems(); }}
            />
        </div>
    );
}

function CaseStudyForm({ open, onOpenChange, initialData, onSuccess }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('edit');

    const contentValue = watch('content') || '';

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
        } else {
            reset({
                title: '',
                slug: '',
                summary: '',
                content: '',
                client_name: '',
                industry: '',
                is_published: false,
                cover_image_url: ''
            });
        }
    }, [initialData, open]);

    // Auto-generate slug from title
    const handleTitleChange = (e) => {
        const title = e.target.value;
        setValue('title', title);
        if (!initialData) {
            const slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setValue('slug', slug);
        }
    };

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `case-studies/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

            const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(fileName);
            setValue('cover_image_url', data.publicUrl);
            toast.success('Image uploaded successfully');
        } catch (error) {
            toast.error('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (initialData?.id) {
                await supabase.from('landing_case_studies').update(data).eq('id', initialData.id);
                toast.success('Case study updated successfully');
            } else {
                await supabase.from('landing_case_studies').insert([data]);
                toast.success('Case study created successfully');
            }
            onSuccess();
        } catch (error) {
            toast.error('Error: ' + error.message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Case Study' : 'New Case Study'}</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="flex-1 overflow-hidden flex flex-col">
                    <div className="flex-1 overflow-y-auto pr-2 space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title *</label>
                                <input
                                    {...register('title', { required: true })}
                                    onChange={handleTitleChange}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Revolutionary Surgical Instrument"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Slug *</label>
                                <input
                                    {...register('slug', { required: true })}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="revolutionary-surgical-instrument"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Client Name</label>
                                <input
                                    {...register('client_name')}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="MedTech Innovations"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Industry</label>
                                <input
                                    {...register('industry')}
                                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                    placeholder="Medical Device"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Summary (Brief description for cards)</label>
                            <textarea
                                {...register('summary')}
                                rows={3}
                                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                placeholder="A brief 2-3 sentence summary of the case study..."
                            />
                        </div>

                        {/* Cover Image */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Cover Image</label>
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                accept="image/*"
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100 cursor-pointer"
                            />
                            {watch('cover_image_url') && (
                                <div className="relative">
                                    <img src={watch('cover_image_url')} alt="Preview" className="h-48 w-full object-cover rounded-md mt-2" />
                                </div>
                            )}
                        </div>

                        {/* Content Editor with Preview */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Full Content</label>
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="edit" className="flex items-center gap-2">
                                        <Code className="w-4 h-4" />
                                        Edit (HTML)
                                    </TabsTrigger>
                                    <TabsTrigger value="preview" className="flex items-center gap-2">
                                        <Eye className="w-4 h-4" />
                                        Preview
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="edit" className="mt-4">
                                    <textarea
                                        {...register('content')}
                                        rows={15}
                                        className="w-full p-3 border rounded-md font-mono text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                        placeholder="<h2>The Challenge</h2>&#10;<p>Describe the problem...</p>&#10;&#10;<h2>Our Solution</h2>&#10;<p>Explain your approach...</p>&#10;&#10;<h2>Results</h2>&#10;<ul>&#10;  <li>Metric 1</li>&#10;  <li>Metric 2</li>&#10;</ul>"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">
                                        Use HTML tags for formatting. Supported: h2, h3, p, ul, ol, li, strong, em, blockquote, etc.
                                    </p>
                                </TabsContent>
                                <TabsContent value="preview" className="mt-4">
                                    <div className="border rounded-md p-6 min-h-[400px] bg-gray-50">
                                        <div
                                            className="prose prose-lg max-w-none"
                                            dangerouslySetInnerHTML={{ __html: contentValue }}
                                        />
                                        {!contentValue && (
                                            <p className="text-gray-400 text-center py-12">No content to preview. Start writing in the Edit tab.</p>
                                        )}
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        {/* Publish Checkbox */}
                        <div className="flex items-center space-x-2 pt-4 border-t">
                            <input
                                type="checkbox"
                                {...register('is_published')}
                                id="pub-cs"
                                className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor="pub-cs" className="text-sm font-medium">
                                Publish case study (make it visible on the website)
                            </label>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end space-x-3 pt-6 border-t mt-6">
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={uploading}>
                            {uploading ? 'Uploading...' : (initialData ? 'Update Case Study' : 'Create Case Study')}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
