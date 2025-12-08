
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Plus, Pencil, Trash2, FileText, Image as ImageIcon } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { useForm } from 'react-hook-form';

export default function CaseStudies() {
    const [items, setItems] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
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
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Case Studies</h1>
                <Button onClick={() => { setEditingItem(null); setIsSheetOpen(true); }}>
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
                                        <span>{item.client_name}</span>
                                        <span>•</span>
                                        <span>{item.industry}</span>
                                    </div>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-medium ${item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {item.is_published ? 'Published' : 'Draft'}
                                </div>
                            </div>
                            <p className="text-gray-600 line-clamp-2">{item.summary}</p>

                            <div className="flex justify-end space-x-2 mt-4">
                                <Button variant="outline" size="sm" onClick={() => { setEditingItem(item); setIsSheetOpen(true); }}>
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
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                initialData={editingItem}
                onSuccess={() => { setIsSheetOpen(false); fetchItems(); }}
            />
        </div>
    );
}

function CaseStudyForm({ open, onOpenChange, initialData, onSuccess }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
        } else {
            reset({ title: '', slug: '', summary: '', content: '', client_name: '', industry: '', is_published: false });
        }
    }, [initialData, open]);

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `case-studies/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(fileName);
            setValue('cover_image_url', data.publicUrl);
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (initialData?.id) {
                await supabase.from('landing_case_studies').update(data).eq('id', initialData.id);
            } else {
                await supabase.from('landing_case_studies').insert([data]);
            }
            onSuccess();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto w-[400px] sm:w-[600px]">
                <SheetHeader>
                    <SheetTitle>{initialData ? 'Edit Case Study' : 'New Case Study'}</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <input {...register('title', { required: true })} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Slug</label>
                            <input {...register('slug', { required: true })} className="w-full p-2 border rounded-md" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Client</label>
                            <input {...register('client_name')} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Industry</label>
                            <input {...register('industry')} className="w-full p-2 border rounded-md" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Summary (Short description)</label>
                        <textarea {...register('summary')} rows={3} className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Content (Markdown/HTML)</label>
                        <textarea {...register('content')} rows={10} className="w-full p-2 border rounded-md font-mono text-sm" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image</label>
                        <input type="file" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                        {watch('cover_image_url') && (
                            <img src={watch('cover_image_url')} alt="Preview" className="h-32 w-full object-cover rounded-md mt-2" />
                        )}
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" {...register('is_published')} id="pub-cs" className="rounded border-gray-300" />
                        <label htmlFor="pub-cs" className="text-sm font-medium">Publish Case Study</label>
                    </div>

                    <Button type="submit" className="w-full" disabled={uploading}>
                        {uploading ? 'Uploading...' : (initialData ? 'Update Case Study' : 'Create Case Study')}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
