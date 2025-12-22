
import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Plus, Pencil, Trash2, ExternalLink, Image as ImageIcon, Rocket } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { useForm } from 'react-hook-form';

export default function Portfolio() {
    const [items, setItems] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    const fetchItems = async () => {
        const { data } = await supabase.from('landing_portfolio_items').select('*').order('created_at', { ascending: false });
        setItems(data || []);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this project?')) return;
        setItems(items.filter(i => i.id !== id));
        await supabase.from('landing_portfolio_items').delete().eq('id', id);
    };

    const handleDeploy = async () => {
        const deployHookUrl = import.meta.env.VITE_RENDER_DEPLOY_HOOK;

        if (!deployHookUrl) {
            alert('Deploy hook URL is not configured. Please check your .env file.');
            return;
        }

        if (!confirm('Are you sure you want to trigger a deployment? This will publish all latest changes to the live site.')) {
            return;
        }

        try {
            const response = await fetch(deployHookUrl, {
                method: 'POST',
                mode: 'no-cors', // standard-fix: bypass CORS
            });

            // With no-cors, we get an opaque response (status 0, type 'opaque'). 
            // We can't actually check .ok or status, but catching the error above handles network failures.
            alert('Deployment signal triggered! Updates should appear in a few minutes.');

        } catch (error) {
            console.error('Deployment error:', error);
            alert('Failed to trigger deployment. Please try again later.');
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Portfolio Projects</h1>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleDeploy} className="text-blue-600 border-blue-600 hover:bg-blue-50">
                        <Rocket className="w-4 h-4 mr-2" /> Deploy Changes
                    </Button>
                    <Button onClick={() => { setEditingItem(null); setIsSheetOpen(true); }}>
                        <Plus className="w-4 h-4 mr-2" /> New Project
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                        <div className="h-48 bg-gray-100 relative">
                            {item.cover_image_url ? (
                                <img src={item.cover_image_url} alt={item.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <ImageIcon className="w-12 h-12" />
                                </div>
                            )}
                            <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${item.is_published ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                                {item.is_published ? 'Published' : 'Draft'}
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                            <p className="text-sm text-gray-500 line-clamp-2 mb-4 flex-1">{item.description}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                <a href={item.live_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline text-sm flex items-center">
                                    <ExternalLink className="w-3 h-3 mr-1" /> View Live
                                </a>
                                <div className="flex space-x-1">
                                    <Button variant="ghost" size="sm" onClick={() => { setEditingItem(item); setIsSheetOpen(true); }}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(item.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <PortfolioForm
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                initialData={editingItem}
                onSuccess={() => { setIsSheetOpen(false); fetchItems(); }}
            />
        </div>
    );
}

function PortfolioForm({ open, onOpenChange, initialData, onSuccess }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach(key => {
                // Convert tags array to comma-separated string for display
                if (key === 'tags' && Array.isArray(initialData[key])) {
                    setValue(key, initialData[key].join(', '));
                } else {
                    setValue(key, initialData[key]);
                }
            });
        } else {
            reset({ title: '', slug: '', description: '', tags: '', live_url: '', repo_url: '', is_published: false });
        }
    }, [initialData, open]);

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `portfolio/${fileName}`;

            const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(filePath);
            setValue('cover_image_url', data.publicUrl);
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            // Convert comma-separated tags string to array
            const formattedData = {
                ...data,
                tags: data.tags
                    ? data.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
                    : []
            };

            if (initialData?.id) {
                await supabase.from('landing_portfolio_items').update(formattedData).eq('id', initialData.id);
            } else {
                await supabase.from('landing_portfolio_items').insert([formattedData]);
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
                    <SheetTitle>{initialData ? 'Edit Project' : 'New Project'}</SheetTitle>
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Description</label>
                        <textarea {...register('description')} rows={4} className="w-full p-2 border rounded-md" />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Tags</label>
                        <input
                            {...register('tags')}
                            placeholder="React, TypeScript, Tailwind (comma-separated)"
                            className="w-full p-2 border rounded-md"
                        />
                        <p className="text-xs text-gray-500">Enter tags separated by commas</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cover Image</label>
                        <input type="file" onChange={handleImageUpload} disabled={uploading} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                        {watch('cover_image_url') && (
                            <img src={watch('cover_image_url')} alt="Preview" className="h-32 w-full object-cover rounded-md mt-2" />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Live URL</label>
                            <input {...register('live_url')} className="w-full p-2 border rounded-md" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Repo URL</label>
                            <input {...register('repo_url')} className="w-full p-2 border rounded-md" />
                        </div>
                    </div>

                    <div className="flex items-center space-x-2">
                        <input type="checkbox" {...register('is_published')} id="pub-proj" className="rounded border-gray-300" />
                        <label htmlFor="pub-proj" className="text-sm font-medium">Publish Project</label>
                    </div>

                    <Button type="submit" className="w-full" disabled={uploading}>
                        {uploading ? 'Uploading...' : (initialData ? 'Update Project' : 'Create Project')}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
