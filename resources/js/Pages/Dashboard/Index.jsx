// resources/js/Pages/Dashboard/Index.jsx
import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiPlus, FiAward, FiUsers, FiTrendingUp, FiCalendar } from 'react-icons/fi';

export default function Dashboard({ cooperative, raffles, stats }) {
    return (
        <AppLayout>
            <PageHeader
                title={cooperative.name + ' Dashboard'}
                actions={[
                    {
                        label: 'Create Raffle',
                        href: route('raffles.create'),
                        icon: <FiPlus />,
                    },
                ]}
            />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <Card className="bg-indigo-500 dark:bg-dark-primary text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-indigo-600 dark:bg-indigo-700 mr-4">
                            <FiAward size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-80">Total Raffles</p>
                            <h3 className="text-2xl font-bold">{stats.total_raffles}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="bg-green-500 dark:bg-dark-success text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-green-600 dark:bg-teal-700 mr-4">
                            <FiUsers size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-80">Total Participants</p>
                            <h3 className="text-2xl font-bold">{stats.total_participants}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="bg-blue-500 dark:bg-dark-info text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-blue-600 dark:bg-blue-700 mr-4">
                            <FiTrendingUp size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-80">Total Winners</p>
                            <h3 className="text-2xl font-bold">{stats.total_winners}</h3>
                        </div>
                    </div>
                </Card>

                <Card className="bg-purple-500 dark:bg-dark-accent text-white">
                    <div className="flex items-center">
                        <div className="p-3 rounded-full bg-purple-600 dark:bg-purple-700 mr-4">
                            <FiCalendar size={24} />
                        </div>
                        <div>
                            <p className="text-sm opacity-80">Active Raffles</p>
                            <h3 className="text-2xl font-bold">{stats.active_raffles}</h3>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Recent Raffles */}
            <Card title="Recent Raffles">
                {raffles.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-light">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Start Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">End Date</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-dark-paper divide-y divide-gray-200 dark:divide-gray-700">
                            {raffles.map((raffle) => (
                                <tr key={raffle.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{raffle.title}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${raffle.status === 'published' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' :
                          raffle.status === 'completed' ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200' :
                              raffle.status === 'cancelled' ? 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200' :
                                  'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'}`
                      }>
                        {raffle.status.charAt(0).toUpperCase() + raffle.status.slice(1)}
                      </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(raffle.start_date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(raffle.end_date).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link href={route('raffles.show', raffle.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3">
                                            View
                                        </Link>
                                        <Link href={route('raffles.edit', raffle.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300">
                                            Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">You haven't created any raffles yet.</p>
                        <Link href={route('raffles.create')} className="btn-primary">
                            Create Your First Raffle
                        </Link>
                    </div>
                )}
            </Card>
        </AppLayout>
    );
}
