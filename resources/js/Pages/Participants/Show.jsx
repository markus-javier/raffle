// resources/js/Pages/Participants/Show.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiChevronLeft, FiEdit, FiMail, FiPhone, FiHash, FiCalendar, FiTag } from 'react-icons/fi';

export default function ParticipantShow({ participant }) {
    return (
        <AppLayout>
            <PageHeader
                title="Participant Details"
                actions={[
                    {
                        label: 'Back to Participants',
                        href: route('participants.index'),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                    {
                        label: 'Edit',
                        href: route('participants.edit', participant.id),
                        icon: <FiEdit />,
                    },
                ]}
            />

            <div className="max-w-3xl mx-auto">
                <Card>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            {participant.name}
                        </h2>

                        <div className="flex flex-wrap mt-4">
                            <div className="flex items-center mr-6 mb-2">
                                <FiMail className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                <span className="text-gray-600 dark:text-gray-300">{participant.email}</span>
                            </div>

                            {participant.phone && (
                                <div className="flex items-center mr-6 mb-2">
                                    <FiPhone className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300">{participant.phone}</span>
                                </div>
                            )}

                            {participant.member_id && (
                                <div className="flex items-center mb-2">
                                    <FiHash className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-2" />
                                    <span className="text-gray-600 dark:text-gray-300">Member ID: {participant.member_id}</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  participant.active
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
              }`}>
                {participant.active ? 'Active' : 'Inactive'}
              </span>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Raffle Entries</h3>

                        {participant.entries && participant.entries.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-dark-light">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Ticket #</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Raffle</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-dark-paper divide-y divide-gray-200 dark:divide-gray-700">
                                    {participant.entries.map((entry) => (
                                        <tr key={entry.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-mono text-gray-900 dark:text-white">{entry.ticket_number}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    <Link
                                                        href={route('raffles.show', entry.raffle.id)}
                                                        className="text-indigo-600 dark:text-indigo-400 hover:underline"
                                                    >
                                                        {entry.raffle.title}
                                                    </Link>
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {entry.raffle.status.charAt(0).toUpperCase() + entry.raffle.status.slice(1)}
                                                </div>
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
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                                This participant has not entered any raffles yet.
                            </p>
                        )}
                    </div>

                    <div className="mt-6 flex justify-between">
                        <Link
                            href={route('participants.index')}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                            &larr; Back to Participants
                        </Link>
                        <Link
                            href={route('participants.edit', participant.id)}
                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                        >
                            Edit Participant &rarr;
                        </Link>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
