// resources/js/Pages/Raffles/Edit.jsx
import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, TextArea, Checkbox, Select, Button } from '@/Components/FormElements';
import { FiChevronLeft, FiTrash2, FiPlus } from 'react-icons/fi';

export default function RaffleEdit({ raffle, prizes }) {
    const { data, setData, put, processing, errors } = useForm({
        title: raffle.title || '',
        description: raffle.description || '',
        start_date: raffle.start_date ? new Date(raffle.start_date).toISOString().slice(0, 16) : '',
        end_date: raffle.end_date ? new Date(raffle.end_date).toISOString().slice(0, 16) : '',
        draw_date: raffle.draw_date ? new Date(raffle.draw_date).toISOString().slice(0, 16) : '',
        max_entries_per_participant: raffle.max_entries_per_participant || 1,
        is_public: raffle.is_public,
        access_code: raffle.access_code || '',
        status: raffle.status || 'draft',
    });

    const statusOptions = [
        { value: 'draft', label: 'Draft' },
        { value: 'published', label: 'Published' },
        { value: 'completed', label: 'Completed' },
        { value: 'cancelled', label: 'Cancelled' },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('raffles.update', raffle.id));
    };

    return (
        <AppLayout>
            <PageHeader
                title="Edit Raffle"
                actions={[
                    {
                        label: 'Back to Raffle',
                        href: route('raffles.show', raffle.id),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <form onSubmit={handleSubmit}>
                            <Input
                                id="title"
                                label="Raffle Title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                error={errors.title}
                                required
                            />

                            <TextArea
                                id="description"
                                label="Description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                error={errors.description}
                                rows={5}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    id="start_date"
                                    type="datetime-local"
                                    label="Start Date"
                                    value={data.start_date}
                                    onChange={(e) => setData('start_date', e.target.value)}
                                    error={errors.start_date}
                                    required
                                />

                                <Input
                                    id="end_date"
                                    type="datetime-local"
                                    label="End Date"
                                    value={data.end_date}
                                    onChange={(e) => setData('end_date', e.target.value)}
                                    error={errors.end_date}
                                    required
                                />
                            </div>

                            <Input
                                id="draw_date"
                                type="datetime-local"
                                label="Draw Date (Optional)"
                                value={data.draw_date}
                                onChange={(e) => setData('draw_date', e.target.value)}
                                error={errors.draw_date}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    id="max_entries_per_participant"
                                    type="number"
                                    label="Max Entries Per Participant"
                                    value={data.max_entries_per_participant}
                                    onChange={(e) => setData('max_entries_per_participant', e.target.value)}
                                    error={errors.max_entries_per_participant}
                                    min={1}
                                    required
                                />

                                <Select
                                    id="status"
                                    label="Status"
                                    options={statusOptions}
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    error={errors.status}
                                    required
                                />
                            </div>

                            <Checkbox
                                id="is_public"
                                label="Public Raffle (Anyone can enter)"
                                checked={data.is_public}
                                onChange={(e) => setData('is_public', e.target.checked)}
                            />

                            {!data.is_public && (
                                <Input
                                    id="access_code"
                                    label="Access Code"
                                    value={data.access_code}
                                    onChange={(e) => setData('access_code', e.target.value)}
                                    error={errors.access_code}
                                    required={!data.is_public}
                                    placeholder="Required for private raffles"
                                />
                            )}

                            <div className="mt-6 flex justify-end">
                                <Button
                                    type="button"
                                    variant="secondary"
                                    className="mr-3"
                                    onClick={() => window.history.back()}
                                >
                                    Cancel
                                </Button>
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

                <div>
                    <Card title="Prizes">
                        {prizes.length > 0 ? (
                            <div className="space-y-4">
                                {prizes.map((prize) => (
                                    <div key={prize.id} className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-dark-light">
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">{prize.name}</h4>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Quantity: {prize.quantity}</p>
                                        </div>
                                        <div className="flex">
                                            <Link
                                                href={route('prizes.edit', prize.id)}
                                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 mr-3"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={route('prizes.destroy', prize.id)}
                                                method="delete"
                                                as="button"
                                                className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                                            >
                                                Delete
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">No prizes added yet.</p>
                        )}

                        <div className="mt-4">
                            <Link
                                href={route('raffles.prizes.create', raffle.id)}
                                className="btn-primary w-full flex items-center justify-center"
                            >
                                <FiPlus className="mr-2" /> Add Prize
                            </Link>
                        </div>
                    </Card>

                    {raffle.status === 'published' && new Date(raffle.end_date) < new Date() && (
                        <Card className="mt-6 bg-indigo-50 dark:bg-indigo-900 border border-indigo-200 dark:border-indigo-800">
                            <h3 className="font-medium text-indigo-800 dark:text-indigo-200 mb-3">Ready for Drawing</h3>
                            <p className="text-indigo-600 dark:text-indigo-300 text-sm mb-4">
                                This raffle has ended and is ready for the prize drawing!
                            </p>
                            <Link
                                href={route('raffles.draw', raffle.id)}
                                method="post"
                                as="button"
                                className="btn-primary w-full"
                            >
                                Draw Winners
                            </Link>
                        </Card>
                    )}

                    <Card className="mt-6 bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-800">
                        <h3 className="font-medium text-red-800 dark:text-red-200 mb-3">Danger Zone</h3>
                        <p className="text-red-600 dark:text-red-300 text-sm mb-4">
                            Deleting a raffle will permanently remove it and all associated data. This action cannot be undone.
                        </p>
                        <Link
                            href={route('raffles.destroy', raffle.id)}
                            method="delete"
                            as="button"
                            className="btn-danger w-full flex items-center justify-center"
                        >
                            <FiTrash2 className="mr-2" /> Delete Raffle
                        </Link>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
