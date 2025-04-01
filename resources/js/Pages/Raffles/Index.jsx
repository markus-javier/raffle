// resources/js/Pages/Raffles/Index.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiPlus, FiCalendar, FiClock, FiUsers, FiTarget } from 'react-icons/fi';

export default function RafflesIndex({ raffles }) {
    const statusColors = {
        draft: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200',
        published: 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200',
        completed: 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200',
        cancelled: 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
    };

    return (
        <AppLayout>
            <PageHeader
                title="Raffles"
                actions={[
                    {
                        label: 'Create Raffle',
                        href: route('raffles.create'),
                        icon: <FiPlus />,
                    },
                ]}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {raffles.data.length > 0 ? (
                    raffles.data.map((raffle) => (
                        <Card key={raffle.id} className="flex flex-col h-full">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {raffle.title}
                                </h2>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColors[raffle.status]}`}>
                  {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
                </span>
                            </div>

                            <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                                {raffle.description ? (
                                    raffle.description.length > 100
                                        ? raffle.description.substring(0, 100) + '...'
                                        : raffle.description
                                ) : (
                                    <span className="text-gray-400 dark:text-gray-500 italic">No description provided</span>
                                )}
                            </p>

                            <div className="grid grid-cols-2 gap-2 mb-4">
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <FiCalendar className="mr-1" />
                                    <span>{new Date(raffle.start_date).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                    <FiClock className="mr-1" />
                                    <span>{new Date(raffle.end_date).toLocaleDateString()}</span>
                                </div>
                            </div>

                            <div className="flex justify-between mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                                <Link href={route('raffles.show', raffle.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                                    View Details
                                </Link>
                                <Link href={route('raffles.edit', raffle.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium">
                                    Edit
                                </Link>
                            </div>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-3">
                        <Card>
                            <div className="text-center py-8">
                                <FiTarget className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No raffles found</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any raffles yet.</p>
                                <Link href={route('raffles.create')} className="btn-primary">
                                    Create Your First Raffle
                                </Link>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            {raffles.data.length > 0 && (
                <div className="mt-6 flex justify-center">
                    <nav className="flex items-center">
                        {raffles.links.map((link, index) => (
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
        </AppLayout>
    );
}
