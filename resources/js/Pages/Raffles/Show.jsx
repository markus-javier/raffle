// resources/js/Pages/Raffles/Show.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import {
    FiEdit,
    FiCalendar,
    FiClock,
    FiUsers,
    FiTarget,
    FiGift,
    FiLock,
    FiUnlock,
    FiTag,
    FiShare2,
    FiUpload,
    FiPlus,
    FiList,
    FiDownload
} from 'react-icons/fi';

export default function RaffleShow({ raffle, prizes, stats }) {
    const statusColors = {
        draft: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        published: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        completed: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
        cancelled: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    };

    const isCompleted = raffle.status === 'completed';

    const copyRaffleLink = () => {
        const url = `${window.location.origin}/raffle/${raffle.slug}`;
        navigator.clipboard.writeText(url);
        alert('Raffle link copied to clipboard!');
    };

    return (
        <AppLayout>
            <PageHeader
                title={raffle.title}
                actions={[
                    {
                        label: 'Edit Raffle',
                        href: route('raffles.edit', raffle.id),
                        icon: <FiEdit />,
                    },
                ]}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card>
                        <div className="flex flex-wrap justify-between items-center mb-6">
              <span className={`px-3 py-1 text-sm font-semibold rounded-full ${statusColors[raffle.status]}`}>
                {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
              </span>

                            <div className="flex space-x-2 mt-2 sm:mt-0">
                                {raffle.status === 'published' && (
                                    <button
                                        onClick={copyRaffleLink}
                                        className="btn-secondary text-xs flex items-center"
                                    >
                                        <FiShare2 className="mr-1" /> Share
                                    </button>
                                )}

                                {isCompleted && (
                                    <Link
                                        href={route('raffles.winners', raffle.id)}
                                        className="btn-primary text-xs flex items-center"
                                    >
                                        <FiGift className="mr-1" /> View Winners
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    <FiCalendar className="mr-1" /> Start Date
                                </div>
                                <div className="font-medium">
                                    {new Date(raffle.start_date).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    <FiClock className="mr-1" /> End Date
                                </div>
                                <div className="font-medium">
                                    {new Date(raffle.end_date).toLocaleDateString()}
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    <FiTag className="mr-1" /> Max Entries
                                </div>
                                <div className="font-medium">
                                    {raffle.max_entries_per_participant} per participant
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                    {raffle.is_public ? <FiUnlock className="mr-1" /> : <FiLock className="mr-1" />} Access
                                </div>
                                <div className="font-medium">
                                    {raffle.is_public ? 'Public' : 'Private'}
                                </div>
                            </div>
                        </div>

                        {raffle.description && (
                            <div className="mb-6">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Description</h3>
                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-600 dark:text-gray-300">{raffle.description}</p>
                                </div>
                            </div>
                        )}

                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                    <FiGift className="mr-2" /> Prizes
                                </h3>
                                <Link
                                    href={route('raffles.prizes.create', raffle.id)}
                                    className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                                >
                                    <FiPlus className="mr-1" /> Add Prize
                                </Link>
                            </div>

                            {prizes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {prizes.map((prize) => (
                                        <div key={prize.id} className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                                            {prize.image && (
                                                <div className="aspect-video bg-gray-100 dark:bg-dark-light w-full">
                                                    <img
                                                        src={`/storage/${prize.image}`}
                                                        alt={prize.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h4 className="font-medium text-gray-900 dark:text-white">
                                                    {prize.name}
                                                </h4>
                                                {prize.description && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        {prize.description}
                                                    </p>
                                                )}
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    Quantity: {prize.quantity}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400 text-center py-4 bg-gray-50 dark:bg-dark-light rounded-md">
                                    No prizes have been added yet.
                                </p>
                            )}
                        </div>

                        {/* Entries Section */}
                        <div className="mb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
                                    <FiUsers className="mr-2" /> Entries
                                </h3>

                                <div className="flex space-x-2">
                                    <Link
                                        href={route('raffles.entries.import', raffle.id)}
                                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                                    >
                                        <FiUpload className="mr-1" /> Import CSV
                                    </Link>
                                    <Link
                                        href={route('raffles.entries.create', raffle.id)}
                                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center"
                                    >
                                        <FiPlus className="mr-1" /> Add Entry
                                    </Link>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="bg-gray-50 dark:bg-dark-light p-4 rounded-md flex flex-col items-center justify-center text-center">
                                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                                        {stats.entry_count}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Total Entries
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-dark-light p-4 rounded-md flex flex-col items-center justify-center text-center">
                                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                                        {stats.participant_count}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Unique Participants
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-dark-light p-4 rounded-md flex flex-col items-center justify-center text-center">
                                    <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">
                                        {raffle.entries ? (raffle.entries.length > 0 ? raffle.entries.length : 0) : 0}
                                    </div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Recent Entries
                                    </div>
                                </div>
                            </div>

                            {raffle.entries && raffle.entries.length > 0 ? (
                                <div>
                                    <div className="overflow-x-auto mb-4">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
                                            <thead className="bg-gray-50 dark:bg-dark-light">
                                            <tr>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticket #</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Participant</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                                <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                            </tr>
                                            </thead>
                                            <tbody className="bg-white dark:bg-dark-paper divide-y divide-gray-200 dark:divide-gray-700">
                                            {raffle.entries.slice(0, 5).map((entry) => (
                                                <tr key={entry.id}>
                                                    <td className="px-4 py-2 whitespace-nowrap font-mono">
                                                        {entry.ticket_number}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {entry.entrant_name}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
                                                        {new Date(entry.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-2 whitespace-nowrap">
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
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="flex justify-between items-center">
                                        <Link
                                            href={route('raffles.entries', raffle.id)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm flex items-center"
                                        >
                                            <FiList className="mr-1" /> View All Entries
                                        </Link>

                                        <button
                                            onClick={() => {
                                                // This would be replaced with actual export functionality
                                                alert('Export functionality would go here');
                                            }}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm flex items-center"
                                        >
                                            <FiDownload className="mr-1" /> Export to CSV
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-6 bg-gray-50 dark:bg-dark-light rounded-md">
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">No entries found for this raffle.</p>
                                    <div className="flex justify-center space-x-4">
                                        <Link
                                            href={route('raffles.entries.create', raffle.id)}
                                            className="btn-primary"
                                        >
                                            <FiPlus className="mr-1" /> Add Entry
                                        </Link>
                                        <Link
                                            href={route('raffles.entries.import', raffle.id)}
                                            className="btn-secondary"
                                        >
                                            <FiUpload className="mr-1" /> Import CSV
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>

                        {raffle.status === 'published' && new Date(raffle.end_date) > new Date() && (
                            <div className="bg-indigo-50 dark:bg-indigo-900 p-4 rounded-md border border-indigo-100 dark:border-indigo-800">
                                <h3 className="text-indigo-800 dark:text-indigo-200 font-medium mb-2">Share this Raffle</h3>
                                <p className="text-indigo-600 dark:text-indigo-300 text-sm mb-3">
                                    Share this link with potential participants to allow them to enter the raffle:
                                </p>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={`${window.location.origin}/raffle/${raffle.slug}`}
                                        readOnly
                                        className="input pr-24"
                                    />
                                    <button
                                        onClick={copyRaffleLink}
                                        className="absolute right-1 top-1 bottom-1 px-3 bg-indigo-600 dark:bg-dark-accent text-white rounded"
                                    >
                                        Copy Link
                                    </button>
                                </div>
                            </div>
                        )}
                    </Card>
                </div>

                <div>
                    <Card>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Raffle Stats</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-light rounded-md">
                                <div className="flex items-center">
                                    <FiUsers className="text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300">Participants</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{stats.participant_count}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-light rounded-md">
                                <div className="flex items-center">
                                    <FiTarget className="text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300">Total Entries</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{stats.entry_count}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-light rounded-md">
                                <div className="flex items-center">
                                    <FiGift className="text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300">Prize Count</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{prizes.length}</span>
                            </div>

                            <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-dark-light rounded-md">
                                <div className="flex items-center">
                                    <FiGift className="text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300">Winners Drawn</span>
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{stats.winner_count}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3 mt-6">
                            {raffle.status === 'published' && (
                                <Link
                                    href={`/raffle/${raffle.slug}/enter`}
                                    className="btn-primary w-full flex items-center justify-center"
                                >
                                    Enter this Raffle
                                </Link>
                            )}

                            <Link
                                href={route('raffles.entries.import', raffle.id)}
                                className="btn-secondary w-full flex items-center justify-center"
                            >
                                <FiUpload className="mr-2" /> Import Entries
                            </Link>

                            <Link
                                href={route('raffles.entries.create', raffle.id)}
                                className="btn-secondary w-full flex items-center justify-center"
                            >
                                <FiPlus className="mr-2" /> Add Entry
                            </Link>

                            <Link
                                href={route('raffles.entries', raffle.id)}
                                className="btn-secondary w-full flex items-center justify-center"
                            >
                                <FiList className="mr-2" /> Manage Entries
                            </Link>

                            {raffle.status === 'completed' && (
                                <Link
                                    href={route('raffles.winners', raffle.id)}
                                    className="btn-primary w-full flex items-center justify-center"
                                >
                                    View Winners
                                </Link>
                            )}
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
                                method="get"
                                as="button"
                                className="btn-primary w-full"
                            >
                                Draw Winners
                            </Link>
                        </Card>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
