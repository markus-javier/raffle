// resources/js/Pages/Raffles/Winners.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiChevronLeft, FiAward, FiGift, FiCheck, FiX } from 'react-icons/fi';

export default function RaffleWinners({ raffle, winners }) {
    const [selectedWinner, setSelectedWinner] = useState(null);

    const markAsClaimed = (winnerId) => {
        // Update winner claimed status
        // This would trigger a form submission in a real app
    };

    return (
        <AppLayout>
            <PageHeader
                title="Raffle Winners"
                actions={[
                    {
                        label: 'Back to Raffle',
                        href: route('raffles.show', raffle.id),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                ]}
            />

            <div className="mb-6">
                <div className="bg-indigo-600 dark:bg-dark-primary rounded-lg text-white p-6 text-center">
                    <FiAward className="h-12 w-12 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold mb-2">{raffle.title} - Winners</h1>
                    <p className="text-indigo-200 dark:text-indigo-300">
                        Draw date: {raffle.draw_date ? new Date(raffle.draw_date).toLocaleDateString() : 'Not specified'}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {winners.length > 0 ? (
                    winners.map((winner) => (
                        <Card key={winner.id} className="border-2 border-indigo-200 dark:border-dark-accent relative">
                            {winner.is_claimed && (
                                <div className="absolute top-3 right-3">
                  <span className="bg-green-500 dark:bg-dark-success text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                    <FiCheck className="mr-1" /> Claimed
                  </span>
                                </div>
                            )}

                            <div className="flex items-center justify-center mb-4 mt-2">
                                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                                    <FiGift className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                                </div>
                            </div>

                            <h3 className="text-lg font-medium text-center mb-2 text-gray-900 dark:text-white">
                                {winner.prize.name}
                            </h3>

                            <div className="text-center mb-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Winner:</span>
                                <div className="font-bold text-gray-900 dark:text-white mt-1">
                                    {winner.participant.name}
                                </div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    Ticket: {winner.raffle_entry.ticket_number}
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
                                Drawn at: {new Date(winner.drawn_at).toLocaleString()}
                            </div>

                            {!winner.is_claimed && (
                                <button
                                    onClick={() => setSelectedWinner(winner)}
                                    className="mt-4 w-full btn-primary"
                                >
                                    Mark as Claimed
                                </button>
                            )}
                        </Card>
                    ))
                ) : (
                    <div className="col-span-3">
                        <Card>
                            <div className="text-center py-8">
                                <FiGift className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No winners yet</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-4">The raffle drawing hasn't been performed yet.</p>
                                <Link href={route('raffles.show', raffle.id)} className="btn-primary">
                                    Back to Raffle
                                </Link>
                            </div>
                        </Card>
                    </div>
                )}
            </div>

            {/* Winner Modal */}
            {selectedWinner && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-paper rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Mark Prize as Claimed
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Are you sure you want to mark this prize as claimed by {selectedWinner.participant.name}?
                            </p>
                            <div className="bg-gray-50 dark:bg-dark-light p-3 rounded-md mb-4">
                                <div className="text-sm text-gray-500 dark:text-gray-400">Prize:</div>
                                <div className="font-medium text-gray-900 dark:text-white">{selectedWinner.prize.name}</div>
                            </div>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setSelectedWinner(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-primary"
                                    onClick={() => {
                                        markAsClaimed(selectedWinner.id);
                                        setSelectedWinner(null);
                                    }}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <Card>
                    <div className="flex justify-between items-center">
                        <Link href={route('raffles.show', raffle.id)} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                            Back to Raffle
                        </Link>
                        <Link href="#" onClick={() => window.print()} className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                            Print Winners List
                        </Link>
                    </div>
                </Card>
            </div>
        </AppLayout>
    );
}
