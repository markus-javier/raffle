// resources/js/Pages/Entries/Create.jsx
// Modify the form to focus on entrant name instead of requiring participant selection

import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, Button } from '@/Components/FormElements';
import { FiChevronLeft } from 'react-icons/fi';

export default function EntriesCreate({ raffle }) {
    const { data, setData, post, processing, errors } = useForm({
        entrant_name: '',
        participant_id: '', // Optional now
        num_entries: 1,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('raffles.entries.store', raffle.id));
    };

    return (
        <AppLayout>
            <PageHeader
                title="Add Raffle Entry"
                actions={[
                    {
                        label: 'Back to Entries',
                        href: route('raffles.entries', raffle.id),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                ]}
            />

            <div className="max-w-3xl mx-auto">
                <Card>
                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Raffle:</h2>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {raffle.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Max entries per participant: {raffle.max_entries_per_participant}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <Input
                            id="entrant_name"
                            label="Entrant Name"
                            value={data.entrant_name}
                            onChange={(e) => setData('entrant_name', e.target.value)}
                            error={errors.entrant_name}
                            required
                        />

                        <Input
                            id="num_entries"
                            type="number"
                            label={`Number of Entries (Max: ${raffle.max_entries_per_participant})`}
                            value={data.num_entries}
                            onChange={(e) => setData('num_entries', e.target.value)}
                            error={errors.num_entries}
                            min={1}
                            max={raffle.max_entries_per_participant}
                            required
                        />

                        <div className="mt-6 flex justify-end">
                            <Link
                                href={route('raffles.entries', raffle.id)}
                                className="btn-secondary mr-3"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? 'Adding...' : 'Add Entry'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
