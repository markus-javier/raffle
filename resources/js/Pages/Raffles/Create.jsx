// resources/js/Pages/Raffles/Create.jsx
import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, TextArea, Checkbox, Select, Button } from '@/Components/FormElements';
import { FiChevronLeft } from 'react-icons/fi';

export default function RaffleCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        draw_date: '',
        max_entries_per_participant: 1,
        is_public: true,
        access_code: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('raffles.store'));
    };

    return (
        <AppLayout>
            <PageHeader
                title="Create New Raffle"
                actions={[
                    {
                        label: 'Back to Raffles',
                        href: route('raffles.index'),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                ]}
            />

            <Card>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
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
                        </div>

                        <div className="space-y-4">
                            <div className="card dark:bg-dark-light p-4">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Raffle Schedule</h3>

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

                                <Input
                                    id="draw_date"
                                    type="datetime-local"
                                    label="Draw Date (Optional)"
                                    value={data.draw_date}
                                    onChange={(e) => setData('draw_date', e.target.value)}
                                    error={errors.draw_date}
                                />
                            </div>

                            <div className="card dark:bg-dark-light p-4">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Entry Settings</h3>

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
                            </div>
                        </div>
                    </div>

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
                            {processing ? 'Creating...' : 'Create Raffle'}
                        </Button>
                    </div>
                </form>
            </Card>
        </AppLayout>
    );
}
