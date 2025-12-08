import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Button } from '../../components/ui/button';
import { Plus, Pencil, Trash2, GripVertical, Star } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../../components/ui/sheet';
import { useForm } from 'react-hook-form';

// DnD Kit Imports
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Sortable Item Component
function SortableItem(props) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center justify-between group">
            <div className="flex items-center space-x-4 flex-1">
                <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded">
                    <GripVertical className="text-gray-400 group-hover:text-gray-600" />
                </div>

                {props.item.image_url ? (
                    <img src={props.item.image_url} alt="" className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                ) : (
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold border border-green-200">
                        {props.item.client_name?.substring(0, 2).toUpperCase()}
                    </div>
                )}

                <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold truncate">{props.item.client_name}</h3>
                        <div className="flex items-center">
                            {[...Array(props.item.rating || 5)].map((_, i) => (
                                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                        {props.item.company} {props.item.role && `• ${props.item.role}`}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1 italic">"{props.item.content}"</p>
                </div>
            </div>

            <div className="flex items-center space-x-2 pl-4 border-l border-gray-100 ml-4">
                <div className={`px-2 py-1 rounded text-xs font-medium ${props.item.is_published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {props.item.is_published ? 'Published' : 'Draft'}
                </div>
                <Button variant="ghost" size="icon" onClick={() => props.onEdit(props.item)}>
                    <Pencil className="w-4 h-4 text-gray-600 hover:text-green-600" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => props.onDelete(props.item.id)}>
                    <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                </Button>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const [items, setItems] = useState([]);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // DnD Sensors
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const fetchItems = async () => {
        const { data } = await supabase.from('landing_testimonials').select('*').order('display_order', { ascending: true });
        setItems(data || []);
    };

    useEffect(() => { fetchItems(); }, []);

    const handleDelete = async (id) => {
        if (!confirm('Delete this testimonial?')) return;
        setItems(items.filter(i => i.id !== id));
        await supabase.from('landing_testimonials').delete().eq('id', id);
    };

    const handleDragEnd = async (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            setItems((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                // Update display_order for all items in the new list
                // We'll trust the index in the array as the display_order
                const updates = newItems.map((item, index) => ({
                    id: item.id,
                    display_order: index,
                }));

                // Fire and forget update (optimistic UI)
                updateOrder(updates);

                return newItems;
            });
        }
    };

    const updateOrder = async (updates) => {
        try {
            // Update items one by one to avoid issues with partial updates in upsert if other fields are required
            await Promise.all(
                updates.map(update =>
                    supabase
                        .from('landing_testimonials')
                        .update({ display_order: update.display_order })
                        .eq('id', update.id)
                )
            );
        } catch (err) {
            console.error('Failed to update order:', err);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
                <Button onClick={() => { setEditingItem(null); setIsSheetOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" /> Add Testimonial
                </Button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <div className="grid gap-4">
                    <SortableContext
                        items={items.map(i => i.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {items.map((item) => (
                            <SortableItem
                                key={item.id}
                                id={item.id}
                                item={item}
                                onEdit={(item) => { setEditingItem(item); setIsSheetOpen(true); }}
                                onDelete={handleDelete}
                            />
                        ))}
                    </SortableContext>
                </div>
            </DndContext>

            <TestimonialForm
                open={isSheetOpen}
                onOpenChange={setIsSheetOpen}
                initialData={editingItem}
                onSuccess={() => { setIsSheetOpen(false); fetchItems(); }}
            />
        </div>
    );
}

function TestimonialForm({ open, onOpenChange, initialData, onSuccess }) {
    const { register, handleSubmit, reset, setValue, watch } = useForm();
    const [uploading, setUploading] = useState(false);
    const imageUrl = watch('image_url');

    useEffect(() => {
        if (initialData) {
            Object.keys(initialData).forEach(key => setValue(key, initialData[key]));
        } else {
            reset({ client_name: '', company: '', role: '', content: '', rating: 5, is_published: true, image_url: '' });
        }
    }, [initialData, open]);

    const handleImageUpload = async (e) => {
        try {
            setUploading(true);
            const file = e.target.files[0];
            if (!file) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `testimonials/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage.from('images').upload(fileName, file);
            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('images').getPublicUrl(fileName);
            setValue('image_url', data.publicUrl);
        } catch (error) {
            alert('Error uploading image: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            if (initialData?.id) {
                await supabase.from('landing_testimonials').update(data).eq('id', initialData.id);
            } else {
                // Determine new display_order (last)
                const { count } = await supabase.from('landing_testimonials').select('*', { count: 'exact', head: true });
                await supabase.from('landing_testimonials').insert([{ ...data, display_order: count || 0 }]);
            }
            onSuccess();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="overflow-y-auto w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>{initialData ? 'Edit Testimonial' : 'New Testimonial'}</SheetTitle>
                </SheetHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Profile Photo</label>
                        <div className="flex items-center space-x-4">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="w-16 h-16 rounded-full object-cover border border-gray-200" />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                                    <Star className="w-6 h-6" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Client Name</label>
                        <input {...register('client_name', { required: true })} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Company</label>
                        <input {...register('company')} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Role</label>
                        <input {...register('role')} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Content</label>
                        <textarea {...register('content', { required: true })} rows={4} className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Rating (1-5)</label>
                        <input type="number" {...register('rating')} min="1" max="5" className="w-full p-2 border rounded-md" />
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" {...register('is_published')} id="pub" className="rounded border-gray-300" />
                        <label htmlFor="pub" className="text-sm font-medium">Publish immediately</label>
                    </div>

                    <Button type="submit" className="w-full" disabled={uploading}>
                        {uploading ? 'Uploading Image...' : (initialData ? 'Update Testimonial' : 'Create Testimonial')}
                    </Button>
                </form>
            </SheetContent>
        </Sheet>
    );
}
