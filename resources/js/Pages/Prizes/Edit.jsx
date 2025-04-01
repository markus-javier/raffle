// resources/js/Pages/Prizes/Edit.jsx
import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, TextArea, Button } from '@/Components/FormElements';
import { FiChevronLeft, FiTrash2 } from 'react-icons/fi';

export default function PrizeEdit({ prize, raffle }) {
    const [imagePreview, setImagePreview] = useState(
        prize.image ? `/storage/${prize.image}` : null
    );

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const { data, setData, put, processing, errors, reset, progress } = useForm({
        name: prize.name || '',
        description: prize.description || '',
        quantity: prize.quantity || 1,
        order: prize.order || 1,
        image: null,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('prizes.update', prize.id), {
            forceFormData: true,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDelete = () => {
        window.location.href = route('prizes.destroy', prize.id);
    };

    return (
        <AppLayout>
            <PageHeader
                title="Edit Prize"
                actions={[
                    {
                        label: 'Back to Raffle',
                        href: route('raffles.edit', raffle.id),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                ]}
            />

            <div className="max-w-2xl mx-auto">
                <Card>
                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Raffle:</h2>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {raffle.title}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            id="name"
                            label="Prize Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <TextArea
                            id="description"
                            label="Description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            error={errors.description}
                            rows={3}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                id="quantity"
                                type="number"
                                label="Quantity"
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                                error={errors.quantity}
                                min={1}
                                required
                            />

                            <Input
                                id="order"
                                type="number"
                                label="Display Order"
                                value={data.order}
                                onChange={(e) => setData('order', e.target.value)}
                                error={errors.order}
                                min={1}
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Prize Image
                            </label>

                            <div className="mt-1 flex items-center">
                                {imagePreview && (
                                    <div className="mr-4">
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-md border border-gray-200 dark:border-gray-700"
                                        />
                                    </div>
                                )}

                                <div>
                                    <input
                                        type="file"
                                        id="image"
                                        onChange={handleImageChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <label
                                        htmlFor="image"
                                        className="btn-secondary cursor-pointer inline-block"
                                    >
                                        {imagePreview ? 'Change Image' : 'Upload Image'}
                                    </label>
                                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                        PNG, JPG, GIF up to 1MB
                                    </p>
                                </div>
                            </div>

                            {progress && (
                                <div className="mt-2">
                                    <div className="w-full bg-gray-200 dark:bg-dark-light rounded-full h-2">
                                        <div
                                            className="bg-indigo-600 dark:bg-dark-primary h-2 rounded-full"
                                            style={{ width: `${progress.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            )}

                            {errors.image && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.image}</p>
                            )}
                        </div>

                        <div className="mt-6 flex justify-between">
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                <FiTrash2 className="mr-2" /> Delete Prize
                            </Button>

                            <div>
                                <Link
                                    href={route('raffles.edit', raffle.id)}
                                    className="btn-secondary mr-3"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-paper rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Are you sure you want to delete this prize? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete Prize
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
