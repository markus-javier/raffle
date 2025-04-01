// resources/js/Pages/Dashboard/SetupCooperative.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import { Input, TextArea, Button } from '@/Components/FormElements';

export default function SetupCooperative() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        primary_color: '#6366F1',
        secondary_color: '#4F46E5',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('cooperatives.store'));
    };

    return (
        <AppLayout>
            <div className="max-w-3xl mx-auto">
                <Card title="Welcome to Raffle SaaS!">
                    <p className="mb-6 text-gray-600 dark:text-gray-300">
                        Before we get started, let's set up your cooperative. This information will be used throughout the platform.
                    </p>

                    <form onSubmit={handleSubmit}>
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

                        <div className="mt-6">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Setting up...' : 'Set Up My Cooperative'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
