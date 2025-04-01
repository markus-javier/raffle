// resources/js/Pages/Public/RaffleShow.jsx
import React from 'react';
import { Link, Head } from '@inertiajs/react';
import { FiCalendar, FiClock, FiGift, FiTag, FiArrowRight, FiUsers, FiCheck, FiUser } from 'react-icons/fi';

export default function PublicRaffleShow({
                                             raffle,
                                             cooperative,
                                             prizes,
                                             entryCount,
                                             isEnded,
                                             isDrawn,
                                             // Optional: add any new props that might be relevant
                                             anonymousEntryAllowed = false // New prop to indicate if anonymous entries are supported
                                         }) {
    return (
        <>
            <Head title={raffle.title} />

            <div className="min-h-screen bg-gray-100 dark:bg-dark">
                <header className="bg-white dark:bg-dark-paper shadow">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                {cooperative.logo ? (
                                    <img
                                        src={`/storage/${cooperative.logo}`}
                                        alt={cooperative.name}
                                        className="h-10 mr-3"
                                    />
                                ) : (
                                    <div
                                        className="h-10 w-10 rounded-full text-white flex items-center justify-center font-bold text-xl mr-3"
                                        style={{ backgroundColor: cooperative.primary_color }}
                                    >
                                        {cooperative.name.charAt(0)}
                                    </div>
                                )}
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                                        {cooperative.name}
                                    </h1>
                                </div>
                            </div>

                            {!isEnded && (
                                <Link
                                    href={`/raffle/${raffle.slug}/enter`}
                                    className="btn-primary"
                                >
                                    Enter Raffle
                                </Link>
                            )}
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white dark:bg-dark-paper shadow rounded-lg overflow-hidden">
                        <div
                            className="h-32 sm:h-48 bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center px-4 sm:px-6 lg:px-8"
                            style={{
                                background: `linear-gradient(to right, ${cooperative.primary_color}, ${cooperative.secondary_color})`
                            }}
                        >
                            <h1 className="text-2xl sm:text-4xl font-bold text-white text-center">
                                {raffle.title}
                            </h1>
                        </div>

                        <div className="px-4 py-5 sm:p-6">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                                <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        <FiCalendar className="mr-1" /> Start Date
                                    </div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {new Date(raffle.start_date).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        <FiClock className="mr-1" /> End Date
                                    </div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {new Date(raffle.end_date).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        <FiTag className="mr-1" /> Max Entries
                                    </div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {raffle.max_entries_per_participant} per person
                                    </div>
                                </div>

                                <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md">
                                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        <FiUsers className="mr-1" /> Entries
                                    </div>
                                    <div className="font-medium text-gray-900 dark:text-white">
                                        {entryCount} total
                                    </div>
                                </div>
                            </div>

                            {raffle.description && (
                                <div className="mb-8">
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-2">About this Raffle</h2>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <p className="text-gray-600 dark:text-gray-300">{raffle.description}</p>
                                    </div>
                                </div>
                            )}

                            {/* Additional note about anonymous entries if allowed */}
                            {anonymousEntryAllowed && (
                                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-4">
                                    <div className="flex items-center">
                                        <FiUser className="h-5 w-5 text-blue-600 dark:text-blue-300 mr-2" />
                                        <p className="text-sm text-blue-800 dark:text-blue-200">
                                            Anonymous entries are allowed for this raffle
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Existing raffle status banners */}
                            {isDrawn ? (
                                <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-800 rounded-md p-4 mb-8">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <FiCheck className="h-5 w-5 text-blue-600 dark:text-blue-300" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Raffle Complete</h3>
                                            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                                                <p>This raffle has been drawn and the winners have been selected.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : isEnded ? (
                                <div className="bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800 rounded-md p-4 mb-8">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <FiClock className="h-5 w-5 text-yellow-600 dark:text-yellow-300" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Raffle Ended</h3>
                                            <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                                                <p>This raffle has ended. The drawing will be conducted soon.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-800 rounded-md p-4 mb-8">
                                    <div className="flex">
                                        <div className="flex-shrink-0">
                                            <FiGift className="h-5 w-5 text-green-600 dark:text-green-300" />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Raffle Active</h3>
                                            <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                                                <p>This raffle is currently active. Enter now for a chance to win!</p>
                                            </div>
                                        </div>
                                        <div>
                                            <Link
                                                href={`/raffle/${raffle.slug}/enter`}
                                                className="btn-primary"
                                            >
                                                Enter Now
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Prizes</h2>

                            {prizes.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {prizes.map((prize) => (
                                        <div key={prize.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                            {prize.image ? (
                                                <div className="aspect-video w-full bg-gray-200 dark:bg-dark-light">
                                                    <img
                                                        src={`/storage/${prize.image}`}
                                                        alt={prize.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="aspect-video w-full bg-gray-200 dark:bg-dark-light flex items-center justify-center">
                                                    <FiGift className="h-12 w-12 text-gray-400 dark:text-gray-600" />
                                                </div>
                                            )}
                                            <div className="p-4">
                                                <h3 className="font-medium text-gray-900 dark:text-white mb-1">{prize.name}</h3>
                                                {prize.description && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{prize.description}</p>
                                                )}
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {prize.quantity > 1 ? `${prize.quantity} winners` : '1 winner'}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 dark:text-gray-400">No prizes have been listed for this raffle yet.</p>
                            )}

                            {!isEnded && (
                                <div className="mt-8 flex justify-center">
                                    <Link
                                        href={`/raffle/${raffle.slug}/enter`}
                                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 dark:bg-dark-primary hover:bg-indigo-700 dark:hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        style={{ backgroundColor: cooperative.primary_color }}
                                    >
                                        Enter Raffle <FiArrowRight className="ml-2" />
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="bg-white dark:bg-dark-paper">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                            <p>© {new Date().getFullYear()} {cooperative.name}. Powered by Cooperative Raffle SaaS.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
