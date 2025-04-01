// resources/js/Pages/Settings/Index.jsx
import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, TextArea, Button } from '@/Components/FormElements';

export default function SettingsIndex({ cooperative }) {
    const [logoPreview, setLogoPreview] = useState(cooperative.logo ? `/storage/${cooperative.logo}` : null);

    const { data, setData, post, processing, errors, progress } = useForm({
        name: cooperative.name || '',
        description: cooperative.description || '',
        primary_color: cooperative.primary_color || '#6366F1',
        secondary_color: cooperative.secondary_color || '#4F46E5',
        logo: null,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cooperatives.update', cooperative.id), {
            forceFormData: true,
        });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setData('logo', file);

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setLogoPreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout>
            <PageHeader title="Cooperative Settings" />

            <div className="max-w-3xl mx-auto">
                <Card>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <div className="mb-2">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Logo
                                </label>
                                <div className="flex items-center">
                                    <div className="mr-4">
                                        {logoPreview ? (
                                            <img
                                                src={logoPreview}
                                                alt="Logo preview"
                                                className="h-24 w-24 object-contain bg-gray-100 dark:bg-dark-light rounded"
                                            />
                                        ) : (
                                            <div className="h-24 w-24 bg-gray-100 dark:bg-dark-light rounded flex items-center justify-center">
                                                <span className="text-gray-400 dark:text-gray-600 text-sm">No logo</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <input
                                            type="file"
                                            id="logo"
                                            onChange={handleLogoChange}
                                            className="hidden"
                                            accept="image/*"
                                        />
                                        <label
                                            htmlFor="logo"
                                            className="btn-secondary cursor-pointer inline-block"
                                        >
                                            {cooperative.logo ? 'Change Logo' : 'Upload Logo'}
                                        </label>
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
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Input
                            id="name"
                            label="Cooperative Name"
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
                            rows={4}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Primary Color
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="color"
                                        id="primary_color"
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        className="h-8 w-8 border-0 p-0 mr-2"
                                    />
                                    <Input
                                        value={data.primary_color}
                                        onChange={(e) => setData('primary_color', e.target.value)}
                                        error={errors.primary_color}
                                        className="flex-1"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Secondary Color
                                </label>
                                <div className="flex items-center">
                                    <input
                                        type="color"
                                        id="secondary_color"
                                        value={data.secondary_color}
                                        onChange={(e) => setData('secondary_color', e.target.value)}
                                        className="h-8 w-8 border-0 p-0 mr-2"
                                    />
                                    <Input
                                        value={data.secondary_color}
                                        onChange={(e) => setData('secondary_color', e.target.value)}
                                        error={errors.secondary_color}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
