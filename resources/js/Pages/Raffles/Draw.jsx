// resources/js/Pages/Raffles/Draw.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useForm, Link } from '@inertiajs/react';
import axios from 'axios';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiChevronLeft, FiAward, FiGift, FiClock, FiPlay, FiPause, FiCheck, FiSave } from 'react-icons/fi';

export default function RaffleDraw({ raffle, prizes, validEntriesCount, entries, existingWinners = [], currentPrizeIndex = 0, currentQuantityIndex = 0 }) {
    const [prizeIndex, setPrizeIndex] = useState(currentPrizeIndex);
    const [quantityIndex, setQuantityIndex] = useState(currentQuantityIndex);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawSpeed, setDrawSpeed] = useState(2); // 1 = slow, 2 = medium, 3 = fast
    const [currentEntry, setCurrentEntry] = useState(null);
    const [drawnWinners, setDrawnWinners] = useState(existingWinners || []);
    const [newWinners, setNewWinners] = useState([]);
    const [drawingComplete, setDrawingComplete] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [availableEntries, setAvailableEntries] = useState([]);
    const [saveStatus, setSaveStatus] = useState(''); // 'saving', 'success', 'error'
    const [saveMessage, setSaveMessage] = useState('');

    const drawTimeoutRef = useRef(null);
    const drawIntervalRef = useRef(null);
    const speedValues = { 1: 2000, 2: 1000, 3: 100 }; // milliseconds per change

    const form = useForm({
        winners: drawnWinners.concat(newWinners)
    });

    // Calculate total prizes to draw
    const totalPrizes = prizes.reduce((sum, prize) => sum + prize.quantity, 0);

    // Current prize being drawn
    const currentPrize = prizes[prizeIndex];

    // Progress information
    const progress = {
        current: drawnWinners.length + newWinners.length + (isDrawing ? 1 : 0),
        total: totalPrizes
    };

    const progressPercentage = progress.total > 0 ? (progress.current / progress.total) * 100 : 0;

    // Start or pause the drawing animation
    const toggleDrawing = () => {
        if (isDrawing) {
            clearInterval(drawIntervalRef.current);
            clearTimeout(drawTimeoutRef.current);
            setIsDrawing(false);
            return;
        }

        // If we already have all winners, don't start drawing
        if (drawnWinners.length + newWinners.length >= totalPrizes) {
            return;
        }

        setIsDrawing(true);
        simulateDrawEntries();
    };

    // Modify your selectWinnerWithEntry function to remove the selected entry
    const selectWinnerWithEntry = (entry) => {
        if (!entry) {
            console.error("No entry provided for winner selection");
            return;
        }

        // Stop drawing animation
        clearInterval(drawIntervalRef.current);
        setIsDrawing(false);

        // Set current entry for display purposes
        setCurrentEntry(entry);

        // Add winner to our list
        const newWinner = {
            id: Date.now(), // Temporary ID for frontend use
            prize_id: currentPrize.id,
            prize_name: currentPrize.name,
            raffle_entry: entry,
            raffle_entry_id: entry.id,
            drawn_at: new Date().toISOString()
        };

        // Add to new winners list
        setNewWinners(prev => [...prev, newWinner]);

        // Remove the selected entry from available entries
        setAvailableEntries(prevEntries =>
            prevEntries.filter(e => e.id !== entry.id)
        );

        // Move to next prize or quantity
        moveToNextDraw();

        // Show confetti effect
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    // Update your simulateDrawEntries function to use availableEntries
    const simulateDrawEntries = () => {
        // Check if we have available entries
        if (availableEntries.length === 0) {
            console.error("No available entries left");
            return;
        }

        // Start with a random entry immediately
        const initialIndex = Math.floor(Math.random() * availableEntries.length);
        setCurrentEntry(availableEntries[initialIndex]);

        // Start scrolling through entries
        drawIntervalRef.current = setInterval(() => {
            if (availableEntries.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableEntries.length);
                setCurrentEntry(availableEntries[randomIndex]);
            }
        }, 100);

        // Add timeout for automatic winner selection
        drawTimeoutRef.current = setTimeout(() => {
            if (availableEntries.length > 0) {
                const winningIndex = Math.floor(Math.random() * availableEntries.length);
                const winningEntry = availableEntries[winningIndex];
                selectWinnerWithEntry(winningEntry);
            } else {
                console.error("No available entries for selection");
                clearInterval(drawIntervalRef.current);
                setIsDrawing(false);
            }
        }, speedValues[drawSpeed]);
    };

    // Keep the original selectWinner for manual clicks
    const selectWinner = () => {
        // For manual selection, we'll use the current entry from state
        if (currentEntry) {
            selectWinnerWithEntry(currentEntry);
        } else {
            console.error("No current entry available for selection");
            // Fallback to random selection if somehow currentEntry is null
            if (entries.length > 0) {
                const randomIndex = Math.floor(Math.random() * entries.length);
                selectWinnerWithEntry(entries[randomIndex]);
            }
        }
    };

    // Logic to move to the next prize/quantity
    const moveToNextDraw = () => {
        if (quantityIndex + 1 < currentPrize.quantity) {
            // Draw more of the same prize
            setQuantityIndex(quantityIndex + 1);
        } else {
            // Move to the next prize
            if (prizeIndex + 1 < prizes.length) {
                setPrizeIndex(prizeIndex + 1);
                setQuantityIndex(0);
            } else {
                // We've drawn all prizes
                setDrawingComplete(true);
            }
        }
    };

    // Save current winners to the database
    const saveCurrentWinners = async () => {
        if (newWinners.length === 0) {
            return;
        }

        // Set saving status
        setSaveStatus('saving');
        setSaveMessage('Saving winners...');

        try {
            // Prepare winners data - only send the new ones
            const winnersData = newWinners.map(winner => ({
                prize_id: winner.prize_id,
                raffle_entry_id: winner.raffle_entry_id,
                drawn_at: winner.drawn_at
            }));

            // Send to the backend
            const response = await axios.post(
                route('raffles.savePartialWinners', raffle.id),
                { winners: winnersData }
            );

            if (response.data.status === 'success') {
                // Update state
                setDrawnWinners(prev => [...prev, ...newWinners]);
                setNewWinners([]);

                setSaveStatus('success');
                setSaveMessage(`${response.data.winners_saved} winner(s) saved successfully`);

                // If all prizes have been drawn, update completion status
                if (response.data.is_completed) {
                    setDrawingComplete(true);
                }

                // Reset status after a delay
                setTimeout(() => {
                    setSaveStatus('');
                    setSaveMessage('');
                }, 3000);
            } else {
                throw new Error('Failed to save winners');
            }
        } catch (error) {
            console.error('Error saving winners:', error);
            setSaveStatus('error');
            setSaveMessage('Error saving winners. Please try again.');

            // Reset status after a delay
            setTimeout(() => {
                setSaveStatus('');
                setSaveMessage('');
            }, 3000);
        }
    };

    // Submit all winners to the server and finish the raffle
    const submitWinners = () => {
        // If there are unsaved winners, save them first
        if (newWinners.length > 0) {
            saveCurrentWinners();
        }

        // Set saving status
        setSaveStatus('saving');
        setSaveMessage('Completing raffle...');

        // Only include winners that haven't been saved yet
        const allWinnersData = newWinners.map(winner => ({
            prize_id: winner.prize_id,
            raffle_entry_id: winner.raffle_entry_id,
            drawn_at: winner.drawn_at
        }));

        // Submit to complete the raffle
        form.post(route('raffles.saveWinners', raffle.id), {
            data: { winners: allWinnersData },
            onSuccess: () => {
                // Redirect happens automatically
                setSaveStatus('success');
                setSaveMessage('Raffle completed successfully');
            },
            onError: () => {
                setSaveStatus('error');
                setSaveMessage('Error completing raffle');
            }
        });
    };

    // Initialize available entries when component loads or when entries prop changes
    useEffect(() => {
        // Filter out entries that have already been drawn
        const drawnEntryIds = [...drawnWinners, ...newWinners].map(w => w.raffle_entry_id || (w.raffle_entry && w.raffle_entry.id));
        const remainingEntries = entries.filter(entry => !drawnEntryIds.includes(entry.id));
        setAvailableEntries(remainingEntries);
    }, [entries, drawnWinners, newWinners]);

    // Clear the interval when component unmounts
    useEffect(() => {
        return () => {
            if (drawIntervalRef.current) {
                clearInterval(drawIntervalRef.current);
            }
            if (drawTimeoutRef.current) {
                clearTimeout(drawTimeoutRef.current);
            }
        };
    }, []);

    // Update form data when winners change
    useEffect(() => {
        form.setData('winners', [...drawnWinners, ...newWinners].map(winner => ({
            prize_id: winner.prize_id,
            raffle_entry_id: winner.raffle_entry_id || (winner.raffle_entry && winner.raffle_entry.id),
            drawn_at: winner.drawn_at
        })));
    }, [drawnWinners, newWinners]);

    useEffect(() => {
        if (!showConfetti) return;

        const confettiContainer = document.querySelector('.confetti-container');
        if (!confettiContainer) return;

        // Clear any existing confetti
        confettiContainer.innerHTML = '';

        // Create confetti pieces
        const colors = ['#3b82f6', '#4f46e5', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');

            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 10 + 5;
            const left = Math.random() * 100;
            const delay = Math.random() * 3;
            const rotation = Math.random() * 360;

            // Apply styles
            confetti.style.backgroundColor = color;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${left}%`;
            confetti.style.animationDelay = `${delay}s`;
            confetti.style.transform = `rotate(${rotation}deg)`;

            // Some confetti can be different shapes
            if (Math.random() > 0.7) {
                confetti.style.borderRadius = '50%';
            } else if (Math.random() > 0.5) {
                confetti.style.borderRadius = '2px';
                confetti.style.width = `${size / 2}px`;
                confetti.style.height = `${size * 2}px`;
            }

            confettiContainer.appendChild(confetti);
        }
    }, [showConfetti]);

    // Render save status indicator
    const renderSaveStatus = () => {
        if (!saveMessage) return null;

        return (
            <span className={`text-sm flex items-center ${
                saveStatus === 'saving' ? 'text-indigo-600 dark:text-indigo-400 animate-pulse' :
                saveStatus === 'success' ? 'text-green-600 dark:text-green-400' :
                'text-red-600 dark:text-red-400'
            }`}
            >
                {saveStatus === 'saving' ? <FiSave className="mr-1" /> :
                 saveStatus === 'success' ? <FiCheck className="mr-1" /> : null}
                {saveMessage}
            </span>
        );
    };

    // All winners (existing + newly drawn)
    const allWinners = [...drawnWinners, ...newWinners];

    return (
        <AppLayout>
            <PageHeader
                title="Raffle Draw"
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
                    <h1 className="text-2xl font-bold mb-2">{raffle.title} - Draw</h1>
                    <p className="text-indigo-200 dark:text-indigo-300">
                        Total Entries: {validEntriesCount} | Total Prizes: {totalPrizes}
                    </p>
                </div>
            </div>

            {/* Progress bar */}
            <Card className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">Drawing Progress</h2>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {progress.current} of {progress.total} prizes
                    </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-dark-light rounded-full h-4 mb-4">
                    <div
                        className="bg-indigo-600 dark:bg-dark-primary h-4 rounded-full transition-all duration-500"
                        style={{ width: `${progressPercentage}%` }}
                    ></div>
                </div>
            </Card>

            {/* Current prize being drawn */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="lg:col-span-1">
                    <Card className="h-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Next Drawing Prize
                        </h2>

                        {currentPrize && !drawingComplete ? (
                            <div className="flex flex-col items-center">
                                <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
                                    <FiGift className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                    {currentPrize.name}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                                    {currentPrize.description || 'No description'}
                                </p>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    Drawing {quantityIndex + 1} of {currentPrize.quantity}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center">
                                <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mb-4">
                                    <FiCheck className="h-10 w-10 text-green-600 dark:text-green-400" />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                                    Drawing Complete
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-center">
                                    All prizes have been successfully drawn
                                </p>
                            </div>
                        )}
                    </Card>
                </div>

                <div className="lg:col-span-2">
                    <Card className="h-full">
                        <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                            Draw Controls
                        </h2>

                        {/* Drawing machine */}
                        <div className="bg-gray-100 dark:bg-dark-light rounded-lg p-6 mb-6 relative overflow-hidden">
                            {showConfetti && (
                                <div className="absolute inset-0 z-10 pointer-events-none confetti-container">
                                    {/* Confetti elements would be dynamically generated */}
                                    <div className="confetti"></div>
                                </div>
                            )}

                            <div className="text-center mb-4">
                                <div className="inline-block bg-white dark:bg-dark-paper rounded-lg border-4 border-indigo-600 dark:border-indigo-500 p-4 min-h-[120px] min-w-[250px] flex items-center justify-center">
                                    {isDrawing ? (
                                        <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 animate-pulse">
                                            {currentEntry ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="text-xl">{currentEntry.entrant_name}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        Ticket: {currentEntry.ticket_number}
                                                    </div>
                                                </div>
                                            ) : 'Shuffling...'}
                                        </div>
                                    ) : (
                                        <div className="text-xl text-gray-600 dark:text-gray-400">
                                            {currentEntry ? (
                                                <div className="flex flex-col items-center">
                                                    <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                                        {currentEntry.entrant_name}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        Ticket: {currentEntry.ticket_number}
                                                    </div>
                                                </div>
                                            ) : 'Press Start to Begin'}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Draw speed controls */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Draw Speed
                                </label>
                                <div className="flex justify-center space-x-4">
                                    {[1, 2, 3].map(speed => (
                                        <button
                                            key={speed}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                                drawSpeed === speed
                                                    ? 'bg-indigo-600 dark:bg-dark-primary text-white'
                                                    : 'bg-gray-200 dark:bg-dark-paper text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-dark-light'
                                            }`}
                                            onClick={() => setDrawSpeed(speed)}
                                            disabled={isDrawing || drawingComplete}
                                        >
                                            {speed === 1 ? 'Slow' : speed === 2 ? 'Medium' : 'Fast'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Draw controls */}
                            <div className="flex justify-center space-x-4">
                                {!drawingComplete && (
                                    <>
                                        <button
                                            className={`px-6 py-3 rounded-md flex items-center font-medium ${
                                                isDrawing
                                                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white'
                                                    : 'bg-green-500 hover:bg-green-600 text-white'
                                            }`}
                                            onClick={toggleDrawing}
                                            disabled={saveStatus === 'saving'}
                                        >
                                            {isDrawing ? (
                                                <>
                                                    <FiPause className="mr-2" /> Drawing...
                                                </>
                                            ) : (
                                                <>
                                                    <FiPlay className="mr-2" /> {allWinners.length > 0 ? 'Continue' : 'Start Draw'}
                                                </>
                                            )}
                                        </button>

                                        {newWinners.length > 0 && !isDrawing && (
                                            <button
                                                className={`px-6 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center ${
                                                    saveStatus === 'saving' ? 'opacity-75' : ''
                                                }`}
                                                onClick={saveCurrentWinners}
                                                disabled={saveStatus === 'saving'}
                                            >
                                                <FiSave className="mr-2" /> Save Audited Winner
                                            </button>
                                        )}
                                    </>
                                )}

                                {drawingComplete && (
                                    <button
                                        className="px-6 py-3 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white font-medium flex items-center"
                                        onClick={submitWinners}
                                        disabled={form.processing || saveStatus === 'saving'}
                                    >
                                        {form.processing || saveStatus === 'saving' ? 'Saving...' : 'Save Results & View Winners'}
                                    </button>
                                )}
                            </div>

                            {/* Save status message */}
                            <div className="mt-4 text-center">
                                {renderSaveStatus()}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Recently drawn winners */}
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Drawn Winners {allWinners.length > 0 && `(${allWinners.length})`}
                    </h2>

                    {/* Save progress button in header */}
                    {newWinners.length > 0 && (
                        <button
                            className={`px-3 py-1 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium flex items-center ${
                                saveStatus === 'saving' ? 'opacity-75' : ''
                            }`}
                            onClick={saveCurrentWinners}
                            disabled={saveStatus === 'saving'}
                        >
                            <FiSave className="mr-1" /> Save Winners
                        </button>
                    )}
                </div>

                {allWinners.length > 0 ? (
                    <div className="space-y-4">
                        {allWinners.map((winner) => {
                            // Determine if this is a saved or unsaved winner
                            const isUnsaved = newWinners.some(w => w.id === winner.id);
                            const entry = winner.raffle_entry || entries.find(e => e.id === winner.raffle_entry_id);

                            if (!entry) return null; // Skip if entry data is missing

                            return (
                                <div
                                    key={winner.id}
                                    className={`bg-gray-50 dark:bg-dark-light p-4 rounded-lg border ${
                                        isUnsaved
                                            ? 'border-blue-300 dark:border-blue-700'
                                            : 'border-gray-200 dark:border-dark-border'
                                    } flex justify-between items-center`}
                                >
                                    <div className="flex items-center">
                                        <div className={`h-10 w-10 rounded-full ${
                                            isUnsaved
                                                ? 'bg-blue-100 dark:bg-blue-900'
                                                : 'bg-indigo-100 dark:bg-indigo-900'
                                            } flex items-center justify-center mr-4`}
                                        >
                                            <FiGift className={`h-5 w-5 ${
                                                isUnsaved
                                                    ? 'text-blue-600 dark:text-blue-400'
                                                    : 'text-indigo-600 dark:text-indigo-400'
                                            }`} />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {winner.prize_name || prizes.find(p => p.id === winner.prize_id)?.name}
                                            </div>
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                Winner: {entry.entrant_name} ({entry.ticket_number})
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        {isUnsaved && (
                                            <span className="mr-3 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 py-1 px-2 rounded">
                                                Unsaved
                                            </span>
                                        )}
                                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                                            <FiClock className="mr-1" />
                                            {new Date(winner.drawn_at).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No winners drawn yet. Start the draw to select winners.
                    </div>
                )}
            </Card>
        </AppLayout>
    );
}
