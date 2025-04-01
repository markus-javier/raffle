// resources/js/Layouts/AppLayout.jsx
import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    FiHome,
    FiAward,
    FiUsers,
    FiSettings,
    FiMenu,
    FiX,
    FiUser,
    FiLogOut,
    FiMoon,
    FiSun
} from 'react-icons/fi';

export default function AppLayout({ children }) {
    const { auth, flash } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);

        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    return (
        <div className="h-screen flex overflow-hidden">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-indigo-700 dark:bg-dark-light transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:z-auto
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
            >
                <div className="h-full flex flex-col">
                    {/* Sidebar header */}
                    <div className="flex items-center justify-between h-16 px-4 border-b border-indigo-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <span className="text-xl font-bold text-white">Raffle SaaS</span>
                        </div>
                        <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white">
                            <FiX size={24} />
                        </button>
                    </div>

                    {/* Sidebar links */}
                    <div className="flex-1 overflow-y-auto py-4">
                        <nav className="px-2 space-y-1">
                            <Link
                                href={route('dashboard')}
                                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${route().current('dashboard')
                                    ? 'bg-indigo-800 dark:bg-dark-accent text-white'
                                    : 'text-indigo-100 hover:bg-indigo-600 dark:hover:bg-gray-700'}
                `}
                            >
                                <FiHome className="mr-3 flex-shrink-0 h-5 w-5" />
                                Dashboard
                            </Link>

                            <Link
                                href={route('raffles.index')}
                                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${route().current('raffles.index')
                                    ? 'bg-indigo-800 dark:bg-dark-accent text-white'
                                    : 'text-indigo-100 hover:bg-indigo-600 dark:hover:bg-gray-700'}
                `}
                            >
                                <FiAward className="mr-3 flex-shrink-0 h-5 w-5" />
                                Raffles
                            </Link>

                            <Link
                                href={route('participants.index')}
                                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${route().current('participants.index')
                                    ? 'bg-indigo-800 dark:bg-dark-accent text-white'
                                    : 'text-indigo-100 hover:bg-indigo-600 dark:hover:bg-gray-700'}
                `}
                            >
                                <FiUsers className="mr-3 flex-shrink-0 h-5 w-5" />
                                Participants
                            </Link>

                            <Link
                                href={route('settings')}
                                className={`
                  flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors
                  ${route().current('settings')
                                    ? 'bg-indigo-800 dark:bg-dark-accent text-white'
                                    : 'text-indigo-100 hover:bg-indigo-600 dark:hover:bg-gray-700'}
                `}
                            >
                                <FiSettings className="mr-3 flex-shrink-0 h-5 w-5" />
                                Settings
                            </Link>
                        </nav>
                    </div>

                    {/* Sidebar footer */}
                    <div className="p-4 border-t border-indigo-800 dark:border-gray-700">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <div className="h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center">
                                    <FiUser className="text-white" />
                                </div>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-white">{auth.user.name}</p>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-xs text-indigo-200 hover:text-white flex items-center mt-1"
                                >
                                    <FiLogOut className="mr-1" size={12} />
                                    Log out
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Top navigation */}
                <div className="bg-white dark:bg-dark-paper shadow-sm z-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex items-center">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden -ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                                >
                                    <span className="sr-only">Open sidebar</span>
                                    <FiMenu className="h-6 w-6" />
                                </button>
                            </div>

                            <div className="flex items-center">
                                {/* Dark mode toggle */}
                                <button
                                    onClick={toggleDarkMode}
                                    className="p-2 rounded-md text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline-none"
                                >
                                    {darkMode ? <FiSun className="h-5 w-5" /> : <FiMoon className="h-5 w-5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Flash messages */}
                {(flash?.success || flash?.error || flash?.warning) && (
                    <div className="p-4">
                        {flash?.success && (
                            <div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 text-green-700 dark:text-green-200 p-4 mb-4 rounded">
                                {flash.success}
                            </div>
                        )}
                        {flash?.error && (
                            <div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200 p-4 mb-4 rounded">
                                {flash.error}
                            </div>
                        )}
                        {flash?.warning && (
                            <div className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 text-yellow-700 dark:text-yellow-200 p-4 mb-4 rounded">
                                {flash.warning}
                            </div>
                        )}
                    </div>
                )}

                {/* Page content */}
                <main className="flex-1 overflow-y-auto bg-gray-100 dark:bg-dark p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
