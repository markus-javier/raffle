// resources/js/Pages/Raffles/Entries.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiPlus, FiCheck, FiX, FiUpload, FiChevronLeft, FiDownload } from 'react-icons/fi';

export default function RaffleEntries({ raffle, entries, importErrors }) {
    const [selectedEntry, setSelectedEntry] = useState(null);
    const [actionType, setActionType] = useState(null);

    const handleAction = (entry, type) => {
        setSelectedEntry(entry);
        setActionType(type);
    };

    const performAction = () => {
        if (!selectedEntry || !actionType) return;

        const route = actionType === 'invalidate'
            ? 'entries.invalidate'
            : 'entries.validate';

        window.location.href = route(route, {
            entry: selectedEntry.id,
            _method: 'PUT'
        });
    };

    const closeModal = () => {
        setSelectedEntry(null);
        setActionType(null);
    };

    const exportToCSV = () => {
        // Create a CSV export of the entries
        const header = "Ticket Number,Name,Email,Phone,Member ID,Date\n";

        const rows = entries.data.map(entry => {
            return `${entry.ticket_number},${entry.participant?.name},${entry.participant?.email},${entry.participant?.phone || ''},${entry.participant?.member_id || ''},${new Date(entry.created_at).toLocaleDateString()}\n`;
        }).join('');

        const blob = new Blob([header, rows], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `${raffle.title.replace(/\s+/g, '_')}_entries.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <AppLayout>
            <PageHeader
                title="Raffle Entries"
                actions={[
                    {
                        label: 'Back to Raffle',
                        href: route('raffles.show', raffle.id),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                    {
                        label: 'Import CSV',
                        href: route('raffles.entries.import', raffle.id),
                        icon: <FiUpload />,
                        variant: 'secondary',
                    },
                    {
                        label: 'Add Entry',
                        href: route('raffles.entries.create', raffle.id),
                        icon: <FiPlus />,
                    },
                ]}
            />

            {importErrors && importErrors.length > 0 && (
                <Card className="mb-6 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800">
                    <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Import Errors</h3>
                    <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 text-sm">
                        {importErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </Card>
            )}

            <Card>
                <div className="mb-4 flex flex-wrap items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            {raffle.title}
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Total Entries: {entries.total}
                        </p>
                    </div>

                    <div className="mt-2 sm:mt-0">
                        <button
                            onClick={exportToCSV}
                            className="btn-secondary flex items-center text-sm"
                        >
                            <FiDownload className="mr-2" /> Export Entries
                        </button>
                    </div>
                </div>

                {entries.data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-light">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticket #</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Entry Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Participant</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-dark-paper divide-y divide-gray-200 dark:divide-gray-700">
                            {entries.data.map((entry) => (
                                <tr key={entry.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-mono text-gray-900 dark:text-white">{entry.ticket_number}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-mono text-gray-900 dark:text-white">{entry.entrant_name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{entry.participant?.name}</div>
                                        {entry.participant?.member_id && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">ID: {entry.participant?.member_id}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{entry.participant?.email}</div>
                                        {entry.participant?.phone && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{entry.participant?.phone}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(entry.created_at).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {entry.is_valid ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          Valid
                        </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          Invalid
                        </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        {entry.is_valid ? (
                                            <button
                                                onClick={() => handleAction(entry, 'invalidate')}
                                                className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                            >
                                                Invalidate
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => handleAction(entry, 'validate')}
                                                className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                                            >
                                                Validate
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No entries found for this raffle.</p>
                        <div className="flex justify-center space-x-3">
                            <Link href={route('raffles.entries.create', raffle.id)} className="btn-primary">
                                Add Manual Entry
                            </Link>
                            <Link href={route('raffles.entries.import', raffle.id)} className="btn-secondary">
                                Import from CSV
                            </Link>
                        </div>
                    </div>
                )}

                {entries.data.length > 0 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center">
                            {entries.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 rounded-md mx-1 ${
                                        link.active
                                            ? 'bg-indigo-600 dark:bg-dark-primary text-white'
                                            : 'bg-white dark:bg-dark-paper text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-light'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </Card>

            {/* Confirmation Modal */}
            {selectedEntry && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-paper rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                {actionType === 'invalidate' ? 'Invalidate Entry' : 'Validate Entry'}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                {actionType === 'invalidate'
                                    ? 'Are you sure you want to invalidate this entry? Invalid entries will not be included in the raffle drawing.'
                                    : 'Are you sure you want to validate this entry? Valid entries will be included in the raffle drawing.'}
                            </p>
                            <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md mb-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Ticket Number:</div>
                                <div className="font-medium text-gray-900 dark:text-white">{selectedEntry.ticket_number}</div>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Participant:</div>
                                <div className="font-medium text-gray-900 dark:text-white">{selectedEntry.entrant_name}</div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className={`btn-${actionType === 'invalidate' ? 'danger' : 'success'}`}
                                    onClick={performAction}
                                >
                                    {actionType === 'invalidate' ? 'Invalidate' : 'Validate'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
